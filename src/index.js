console.clear();
import express from "express";
import { PORT } from "./config.js";

const app = express();

app.listen(3000);

console.log("server on port", 3000);
