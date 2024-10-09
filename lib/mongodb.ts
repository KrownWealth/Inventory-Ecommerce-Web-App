import { MongoClient } from "mongodb";

const uri = process.env.NEXT_MONGODB_URL;  
let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;
