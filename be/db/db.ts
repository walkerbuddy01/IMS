import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/IMS?authSource=admin`
    );
    console.log(connectionInstance.connection.host);
  } catch (error: any) {
    console.log(`ERROR: occured in the connecting DB : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
