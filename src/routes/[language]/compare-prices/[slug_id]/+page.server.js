import { connection } from '$lib/db';
import { locale } from '$lib/state/locale.svelte';
import { ObjectId } from 'mongodb'

export async function load({ params, parent }) {
  const { slug_id } = params;
  const index = slug_id.lastIndexOf("-");  
  const variant_id = slug_id.substring(index + 1);

  const db = await connection();
  const variants_collection = db.collection('variants');
  
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
        as: "retailer"
    } },
    { $unwind: "$retailer"},
    { $group: {
      _id: { $toString: "$_id" },
      thumbnails: { $first: "$thumbnails" },
      images: { $first: "$images" },
      title: { $first: "$variant_language.title" },
      brand: { $first: "$product.brand" },
      ratings: { $first: "$product.ratings" },
      description: { $first: "$product_language.description" },
      options: { $first: { 
        $map: {
          input: "$product.options",
          as: "option",
          in: {
            name: `$$option.languages.${locale.language}.name`,
            key: "$$option.key",
            values: "$$option.values"
          }
        }
      } },
      variants: { $first: {
        $map: {
          input: "$product.variants",
          as: "variant",
          in: {
            variant_id: { $toString: "$$variant.variant_id" },
            options: "$$variant.options",
            slug: `$$variant.languages.${locale.language}.slug`
          }
        }
      } },
      category: { $first: "$categories_language" },
      retailers: {
        $push: {
          $let: {
            vars: {
              retailerIndex: { $indexOfArray: ["$variant_region.retailers.retailer_id", "$retailer._id"] }
            },
            in: {
              name: "$retailer.name",
              logo_url: "$retailer.logo_url",
              link: { $arrayElemAt: ["$variant_region.retailers.link", "$$retailerIndex"] },
              shipping_cost: { $arrayElemAt: ["$variant_region.retailers.shipping_cost", "$$retailerIndex"] },
              price: { $arrayElemAt: ["$variant_region.retailers.price", "$$retailerIndex"] }
            }
          }
        }
      } 
    } }
  ]).toArray();

  return { product };
}