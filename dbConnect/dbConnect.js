import mongoose from 'mongoose';

export default async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        console.log('Already connected to MongoDb');
        return;
    }

    try {
        await mongoose.connect('');
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log("Error connecting to MongoDb: ".error)
    }
}