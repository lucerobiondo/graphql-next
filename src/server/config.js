import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.NEXT_PUBLIC_MONGODB_URI || "mongodb://localhost:27017/examplegraphqldb";