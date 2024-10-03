import mongoose from "mongoose";
export const connectDB = async (req, res) => {
    const uri = "mongodb+srv://abhisheksingh4311:nagpur420@expense-tracker.y6ffhlh.mongodb.net/?retryWrites=true&w=majority";
    const db = uri;

    const { connection } = await mongoose.connect(db, { useNewUrlParser: true });

    console.log(`MongoDB Connected to ${connection.host}`);

}