import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGODB_URL || "",
};

export default config;