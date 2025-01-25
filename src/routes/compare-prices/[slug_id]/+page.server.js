import { connection } from '$lib/db';
import { ObjectId } from 'mongodb'

export async function load({ params }) {
  const { slug_id } = params;
  const index = slug_id.lastIndexOf("-");
  const product_id = slug_id.substring(index + 1);
  const region_id = "67942b3721cc010007e278df";

  const db = await connection();
  const products_collection = db.collection('products');
  const prices_collection = db.collection('prices');

  const product = await products_collection.findOne(
    { _id: new ObjectId(product_id) },
    { projection: { _id: 0 } }
  );
  
  const prices = await prices_collection.aggregate([
    { 
      $match: { 
        "metadata.product_id": new ObjectId(product_id),
        "metadata.region_id": new ObjectId(region_id)
      } 
    },
    {
      $group: {
        _id: "$metadata.retailer_id",
        price: { $first: "$price" },
        timestamp: { $first: "$timestamp" }
      }
    },
    {
      $lookup: {
        from: 'retailers',
        localField: '_id',
        foreignField: '_id',
        as: 'retailer'
      }
    },
    { $unwind: "$retailer" },
    {
      $project: {
        _id: 0,
        price: 1,
        timestamp: 1,
        retailer_name: "$retailer.name",
        retailer_logo_url: "$retailer.logo_url"
      }
    },
    { $sort: { price: 1 } }
  ]).toArray();

  return { product, prices };
}