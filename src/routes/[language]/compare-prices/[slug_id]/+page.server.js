import { connection } from '$lib/db';
import { locale } from '$lib/state/locale.svelte';
import { ObjectId } from 'mongodb'

export async function load({ params }) {
  const { slug_id } = params;
  const index = slug_id.lastIndexOf("-");  
  const variant_id = slug_id.substring(index + 1);
  
  const db = await connection();
  const variants_collection = db.collection('variants');
  
  const product = await variants_collection.aggregate([
    { $match: { _id: new ObjectId(variant_id) } },
    // join variant with product
    { $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product"
    } },
    { $unwind: "$product" },
    // filter only the current language and region
    { $set: {
        variant_language: `$languages.${locale.language}`,
        variant_region: `$regions.${locale.region}`,
        product_language: `$product.languages.${locale.language}`
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
      slug: { $first: "$variant_language.slug" },
      retailers: {
        $push: {
          name: "$retailer.name",
          logo_url: "$retailer.logo_url",
          link: "$retailers.link",
          shipping_cost: "$retailers.shipping_cost",
          price: "$retailers.price"
        }
      },
      categories: { $first: "$product.categories" },
      options: { $first: "$product.options" },
      variants: { $first: {
        $map: {
          input: "$product.variants",
          as: "variant",
          in: {
            variant_id: { $toString: "$$variant.variant_id" },
            values: "$$variant.values"
          }
        }
      }},
      brand: { $first: "$product.brand" },
      ratings: { $first: "$product.ratings" },
      description: { $first: "$product_language.description" }
    } }
  ]).next();

  return { product };
}