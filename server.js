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

// To connect to Google Sheets, insert your Webhook URL here (e.g. from Make, Zapier, or Google Apps Script)
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxLqHmgRgooygm6IxHk4pNL7srNV5NABQZpoSwKD4HWlhz5kWMr46m9BTTKWuhoyRl5yA/exec";

app.post("/api/orders", async (req, res) => {
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
  
  // Format product name and SKU if upsell is included
  let finalProductName = order.product_name;
  let finalSku = order.product_id;
  let finalNotes = order.notes || "";
  
  if (order.has_upsell) {
    finalProductName += " + زيت التدليك العضوي (Upsell)";
    finalSku += " + UPSELL-OIL-01";
  }

  const stored = {
    id,
    created_at: new Date().toISOString(),
    status: "pending",
    payment_method: "cod",
    ...order,
    product_name: finalProductName,
    product_id: finalSku,
  };

  const orders = readOrders();
  orders.unshift(stored);
  writeOrders(orders);

  // Send to CODNetwork / Google Sheets Webhook
  if (GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      const sheetPayload = {
        OrderDate: stored.created_at,
        country: "SA",
        name: stored.customer_name,
        phone: stored.phone,
        address: `${stored.city} - ${stored.address}`,
        url: "https://saftaa.shop",
        sku: finalSku,
        Product: finalProductName,
        quantity: stored.quantity_pack || "1",
        price: stored.total_price,
        currency: "SAR",
        notes: finalNotes,
      };

      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetPayload)
      });
      console.log(`Successfully pushed lead ${id} to Google Sheets`);
    } catch (e) {
      console.error("Failed to push lead to Google Sheets webhook:", e);
    }
  }

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
