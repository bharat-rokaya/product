import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
    mongoose.connect(config.mongoUrl).then(() => {
        console.log('MongoDB connected successfully');
    }).catch((error) => {
        console.error(error);
    });
};

export default connectDB;