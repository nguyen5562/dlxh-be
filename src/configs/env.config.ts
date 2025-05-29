import 'dotenv/config';

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is required in environment variables');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required in environment variables');
}

export const databaseConfig = {
  uri: process.env.MONGO_URI,
};

export const appConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
};
