import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 8080, // Default to 8080 if not set
    mongo_uri: process.env.MONGO_URI,
    secret_jwt: process.env.SECRET_JWT
};
