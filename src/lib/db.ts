import { MongoClient } from 'mongodb';

const mongo_user = import.meta.env.VITE_MONGO_USER;
const mongo_password = import.meta.env.VITE_MONGO_PASSWORD;
const mongo_ip = import.meta.env.VITE_MONGO_IP;
const mongo_port = import.meta.env.VITE_MONGO_PORT;
const mongo_db_name = import.meta.env.VITE_MONGO_DB_NAME;

const mongo_uri = `mongodb://${mongo_user}:${mongo_password}@${mongo_ip}:${mongo_port}`;

let client: MongoClient | null = null;

export async function connection() {
  if (!client) {
    client = new MongoClient(mongo_uri);
    await client.connect();
  }
  return client.db(mongo_db_name);
}