import dotenv from "dotenv";
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/testbd"

export const PORT = process.env.PORT || 4000