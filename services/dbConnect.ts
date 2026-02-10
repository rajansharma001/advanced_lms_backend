import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URL || "";
if (!mongoURI) {
  console.log("MongoDB URL not found.");
}

export const dbConnect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("DB connected successfully.");
  } catch (error) {
    console.log("MONGO ERROR! : ", error);
  }
};
