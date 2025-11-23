import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "../models/Student.js";

dotenv.config();

async function sync() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected — syncing indexes for Student...");
  const res = await Student.syncIndexes();
  console.log("syncIndexes result:", res);
  await mongoose.disconnect();
}

sync().catch(err => { console.error(err); process.exit(1); });