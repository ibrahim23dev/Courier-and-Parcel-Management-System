import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET!,
  mongoUri: process.env.MONGO_URI!,
  googleApiKey: process.env.GOOGLE_API_KEY!
};