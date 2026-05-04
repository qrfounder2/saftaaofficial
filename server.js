import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const distDir = path.join(__dirname, "dist");
const storageDir = path.join(__dirname, "storage");
const ordersFile = path.join(storageDir, "orders.json");

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, "[]", "utf8");
}

const readOrders = () => {
  try {
    const raw = fs.readFileSync(ordersFile, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const writeOrders = (orders) => {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), "utf8");
};

app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "saftaa-care-hub" });
});

app.post("/api/orders", (req, res) => {
  const order = req.body ?? {};
  const required = [
    "customer_name",
    "phone",
    "city",
    "address",
    "product_name",
    "total_price",
  ];

  const missing = required.filter((key) => !order[key]);
  if (missing.length > 0) {
    res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    return;
  }

  const id = `ORD-${Date.now().toString().slice(-8)}`;
  const stored = {
    id,
    created_at: new Date().toISOString(),
    status: "pending",
    payment_method: "cod",
    ...order,
  };

  const orders = readOrders();
  orders.unshift(stored);
  writeOrders(orders);
  res.status(201).json(stored);
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
} else {
  app.get("*", (_req, res) => {
    res.status(404).json({ error: "Frontend not built or not served by this backend instance." });
  });
}

app.listen(port, () => {
  console.log(`Saftaa self-hosted server running on :${port}`);
});
