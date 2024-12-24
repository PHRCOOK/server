// Cargar el archivo .env
import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();
app.use(express.json());

// Usa la variable de entorno PORT si está definida, o un valor por defecto
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
