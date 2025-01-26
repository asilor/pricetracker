import { connection } from '$lib/db';
import { ObjectId } from 'mongodb'

export async function load({ params }) {
  const { slug_id } = params;
  const index = slug_id.lastIndexOf("-");  
  const variant_id = "679617d221cc010007e27926" //slug_id.substring(index + 1);
  const language = "es";
  const region = "ES";

  const db = await connection();
  const variants_collection = db.collection('variants');
  const products_collection = db.collection('products');

  const variant = await variants_collection.findOne({ _id: new ObjectId(variant_id) },);
  const product = await products_collection.findOne({ _id: new ObjectId(variant.product_id) },);

  const result = {
    // variant
    variant_id: variant._id.toString(),
    thumbnails: variant.thumbnails,
    images: variant.images,
    title: variant.languages[language].title,
    slug: variant.languages[language].slug,
    retailers: variant.regions[region].retailers.map(retailer => ({
      retailer_id: retailer.retailer_id.toString(),
      link: retailer.link,
      shipping_cost: retailer.shipping_cost,
      price: retailer.price
    })),

    // product
    categories: product.categories,
    options: product.options,
    variants: product.variants.map(variant => ({
      variant_id: variant.variant_id.toString(),
      values: variant.values
    })),
    brand: product.brand,
    ratings: product.ratings,
    description: product.languages[language].description
  };

  return { result };
}