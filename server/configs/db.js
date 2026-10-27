import mongoose from "mongoose";

const connectDB = async ()=>{
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error('MONGODB_URI is not set. Add it to server/.env before starting the API.');
    }

    mongoose.connection.on('connected', () => console.log('Database Connected'));
    try {
        await mongoose.connect(`${mongoUri.replace(/\/$/, '')}/greencart`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        throw error;
    }
}


export default connectDB;
