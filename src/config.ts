import dotenv from "dotenv";
dotenv.config();

export default {
  Port: process.env.PORT || 4000,
};
