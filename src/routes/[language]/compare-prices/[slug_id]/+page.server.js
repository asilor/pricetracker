import { connection } from '$lib/db';
import { locale } from '$lib/state/locale.svelte';
import { ObjectId } from 'mongodb'

export async function load({ params, parent }) {
  const { slug_id } = params;
  const index = slug_id.lastIndexOf("-");  
  const variant_id = slug_id.substring(index + 1);

  const db = await connection();
  const variants_collection = db.collection('variants');

  const region_id = "6793e45d21cc010007e277a4";
  
  await parent(); // update locale state first

  const [product] = await variants_collection.aggregate([
    { $match: { _id: new ObjectId(variant_id) } },
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
        variant_region: `$regions.${locale.region}`,
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
    // join variant with prices
    { $lookup: {
      from: "prices",
      localField: "_id",
      foreignField: "metadata.variant_id",
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
                      cond: {
                        $and: [
                          { $eq: ["$$this.metadata.retailer_id", "$$retailer._id"] },
                          { $eq: ["$$this.metadata.region_id", new ObjectId(region_id)] }
                        ]
                      }
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

  console.log(product.retailers)
  
  return { product };
}