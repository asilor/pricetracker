import { connection } from '$lib/db';
import { locale } from '$lib/state/locale.svelte';
import { ObjectId } from 'mongodb'

export async function load({ params, parent }) {
  const { slug_id } = params;
  const index = slug_id.lastIndexOf("-");  
  const variant_id = slug_id.substring(index + 1);
  
  const variant_object_id = new ObjectId(variant_id);
  const region_object_id = new ObjectId(locale.region_id);

  const db = await connection();
  const variants_collection = db.collection('variants');
  
  await parent(); // update locale state first

  const [product] = await variants_collection.aggregate([
    { $match: { _id: variant_object_id } },
    // join variant with product
    { $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product"
    } },
    { $unwind: "$product" },
    // join product with categories
    { $lookup: {
      from: "categories",
      localField: "product.category_id",
      foreignField: "_id",
      as: "category"
    } },
    { $unwind: "$category" },
    // filter only the current language and region
    { $set: {
        variant_language: `$languages.${locale.language}`,
        variant_region: `$regions.${locale.region_id}`,
        product_language: `$product.languages.${locale.language}`,
        categories_language: `$category.languages.${locale.language}`
    } },
    // join variant retailers with retailers collection
    { $lookup: {
      from: "retailers",
      localField: "variant_region.retailers.retailer_id",
      foreignField: "_id",
      as: "retailers"
    } },
    // join prices with variant and region and sort by latest price
    { $lookup: {
      from: "prices",
      pipeline: [
        { $match: { 
          "metadata.variant_id": variant_object_id,
          "metadata.region_id": region_object_id
        } },
        { $sort: { timestamp: -1 } }
      ],
      as: "prices"
    } },
    { $project: {
      _id: { $toString: "$_id" },
      thumbnails: "$thumbnails",
      images: "$images",
      title: "$variant_language.title",
      brand: "$product.brand",
      ratings: "$product.ratings",
      description: "$product_language.description",
      category: "$categories_language",
      options: {
        $map: {
          input: "$product.options",
          as: "option",
          in: {
            name: `$$option.languages.${locale.language}.name`,
            key: "$$option.key",
            values: "$$option.values"
          }
        }
      },
      variants: {
        $map: {
          input: "$product.variants",
          as: "variant",
          in: {
            variant_id: { $toString: "$$variant.variant_id" },
            options: "$$variant.options",
            slug: `$$variant.languages.${locale.language}.slug`
          }
        }
      },
      retailers: {
        $map: {
          input: "$retailers",
          as: "retailer",
          in: {
            $let: {
              vars: {
                index: { $indexOfArray: ["$variant_region.retailers.retailer_id", "$$retailer._id"] },
                filtered_prices: { 
                  $first: {
                    $filter: {
                      input: "$prices",
                      cond: { $eq: ["$$this.metadata.retailer_id", "$$retailer._id"] }
                    }
                  }
                }
              },
              in: {
                name: "$$retailer.name",
                logo_url: "$$retailer.logo_url",
                link: { $arrayElemAt: ["$variant_region.retailers.link", "$$index"] },
                shipping_cost: { $arrayElemAt: ["$variant_region.retailers.shipping_cost", "$$index"] },
                price: "$$filtered_prices.price",
                timestamp: "$$filtered_prices.timestamp"
              }
            }
          }
        }
      }
    } }
  ]).toArray();
  
  return { product };
}