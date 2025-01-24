import mongoose from "mongoose";
import { Nitro } from 'nitropack';
export default async (_nitroApp: Nitro ) => {
  const config = useRuntimeConfig();
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Connected to the MongoDB");
  } catch (e) {
    console.error(e);
  }
};