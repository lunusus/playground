import fs from "node:fs";
import express from "express";
import Block from "./../module/block.js";

const app = express();
const port = 3000;
const dataPath = "./data";

// Middleware для CORS
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-API-Key, Accept");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.get("/map", (req, res) => {
  const data = fs.readFileSync(`${dataPath}/map.json`, { encoding: "utf8" });
  res.json(JSON.parse(data));
});

app.get("/blocks/static", (req, res) => {
  const data = fs.readFileSync(`${dataPath}/blocks.json`, { encoding: "utf8" });
  res.json(JSON.parse(data));
});

app.get("/blocks", (req, res) => {
  let data = [];
  for (let i = 0; i < 50; i++) {
    data.push(Block.create());
  }
  res.json(data);
});

app.listen(port, () => {
  console.log("Сервер запущен на порту " + port);
});
