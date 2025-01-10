import dotenv from "dotenv";

dotenv.config();

const envVariables = {
  PORT: process.env.PORT,
  API_KEY: process.env.CLOUD_API_KEY,
  API_SECRET: process.env.CLOUD_API_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,
};

export default envVariables;
