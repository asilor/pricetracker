import { connection } from '$lib/db';
import { ObjectId } from 'mongodb'

export async function load({ params }) {
  const { slug_id } = params;
  const index = slug_id.lastIndexOf("-");
  const id = slug_id.substring(index + 1);

  const db = await connection();
  const collection = db.collection('products');

  const product = await collection.findOne({ _id: new ObjectId(id) });
  product._id = product._id.toString();

  return { product };
}