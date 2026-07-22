import mongoose from 'mongoose'

export const ConnectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
        return "Connect Database Successfully";
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        return error.message;
    }
}
