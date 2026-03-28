import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/Ekart`);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection failed:", err.message);
  }
};

export default connectDb;
