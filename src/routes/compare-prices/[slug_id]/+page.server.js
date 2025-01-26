import { connection } from '$lib/db';
import { ObjectId } from 'mongodb'

export async function load({ params }) {
  const { slug_id } = params;
  const index = slug_id.lastIndexOf("-");  
  const variant_id = slug_id.substring(index + 1);
  const language = "en";
  const region = "ES";

  const db = await connection();
  const variants_collection = db.collection('variants');
  
  const [result] = await variants_collection.aggregate([
    {
      $match: {
        _id: new ObjectId(variant_id)
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product"
      }
    },
    {
      $unwind: "$product"
    },
    {
      $project: {
        _id: 1,
        thumbnails: 1,
        images: 1,
        "languages": 1,
        "regions": 1,
        product: 1,
        retailers: `$regions.${region}.retailers`
      }
    },
    {
      $unwind: "$retailers"
    },
    {
      $lookup: {
        from: "retailers",
        localField: "retailers.retailer_id",
        foreignField: "_id",
        as: "retailer_info"
      }
    },
    {
      $unwind: "$retailer_info"
    },
    {
      $group: {
        _id: "$_id",
        variant_id: { $first: "$_id" },
        thumbnails: { $first: "$thumbnails" },
        images: { $first: "$images" },
        title: { $first: `$languages.${language}.title` },
        slug: { $first: `$languages.${language}.slug` },
        retailers: {
          $push: {
            name: "$retailer_info.name",
            logo_url: "$retailer_info.logo_url",
            link: "$retailers.link",
            shipping_cost: "$retailers.shipping_cost",
            price: "$retailers.price"
          }
        },
        categories: { $first: "$product.categories" },
        options: { $first: "$product.options" },
        variants: { $first: "$product.variants" },
        brand: { $first: "$product.brand" },
        ratings: { $first: "$product.ratings" },
        description: { $first: `$product.languages.${language}.description` }
      }
    },
    {
      $project: {
        _id: 0,
        variant_id: { $toString: "$variant_id" },
        thumbnails: 1,
        images: 1,
        title: 1,
        slug: 1,
        retailers: 1,
        categories: 1,
        options: 1,
        variants: {
          $map: {
            input: "$variants",
            as: "variant",
            in: {
              variant_id: { $toString: "$$variant.variant_id" },
              values: "$$variant.values"
            }
          }
        },
        brand: 1,
        ratings: 1,
        description: 1
      }
    }
  ]).toArray();

  return { result };
}