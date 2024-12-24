import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/users", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.json(rows);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FORM users WHERE id = $1", [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
});

router.post("/users", async (req, res) => {
  const data = req.body;
  console.log(data);
  const { rows } = await pool.query(
    "INSERT INTO users (name,email) VALUES ($1, $2) RETURNING*",
    [data.name, data.email]
  );
  return res.json(rows[0]);
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { rows, rowcount } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  console.log(rows);
  if (rowcount === 0) {
    return res.status(404).json({ message: "User not found" });
  } else {
    return res.json(rows);
  }
});

router.put("/users/:id", (req, res) => {
  res.send("modificando usuarios");
});

export default router;
