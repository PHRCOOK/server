import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
