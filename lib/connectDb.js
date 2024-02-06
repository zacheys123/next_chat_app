import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.log("ERROR CONNECTING TO DATABASE", error);
  }
};
