import { connection } from '$lib/db';
import { locale } from '$lib/state/locale.svelte';

export async function load({ parent }) {
  const db = await connection();
  const variants_collection = db.collection('variants');

  await parent(); // update locale state first

  const products = await variants_collection.aggregate([
    { $limit: 10 },
    // join variant with product
    { $lookup: {
      from: "products", 
      localField: "product_id",
      foreignField: "_id",
      as: "product"
    } },
    { $unwind: "$product" },
    { $addFields: {
      matched_variant: {
        $first: {
          $filter: {
            input: "$product.variants",
            cond: { $eq: ["$$this.variant_id", "$_id"] }
          }
        }
      }
    } },
    { $project: {
      _id: { $toString: "$_id" },
      images: "$images",
      title: `$languages.${locale.language}.title`,
      slug: `$matched_variant.languages.${locale.language}.slug`,
      discount: { $literal: 20 }
    } }
  ]).toArray();

  return { products };
}