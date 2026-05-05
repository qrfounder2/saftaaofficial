import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";
import geoip from "geoip-lite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const distDir = path.join(__dirname, "dist");
const storageDir = path.join(__dirname, "storage");
const ordersFile = path.join(storageDir, "orders.json");
const trafficLogsFile = path.join(storageDir, "traffic_logs.json");
const leadsFile = path.join(storageDir, "leads.json");
const productsOverrideFile = path.join(storageDir, "products_override.json");
const redirectsFile = path.join(storageDir, "redirects.json");
const settingsFile = path.join(storageDir, "settings.json");

const JWT_SECRET = process.env.JWT_SECRET || "safta_super_secret_jwt_key_2026";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Mpmp*201";

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, "[]", "utf8");
}
if (!fs.existsSync(trafficLogsFile)) {
  fs.writeFileSync(trafficLogsFile, "[]", "utf8");
}
if (!fs.existsSync(leadsFile)) {
  fs.writeFileSync(leadsFile, "[]", "utf8");
}
if (!fs.existsSync(productsOverrideFile)) {
  fs.writeFileSync(productsOverrideFile, "{}", "utf8");
}
if (!fs.existsSync(redirectsFile)) {
  fs.writeFileSync(redirectsFile, "[]", "utf8");
}
if (!fs.existsSync(settingsFile)) {
  fs.writeFileSync(settingsFile, JSON.stringify({
    googleSheetsUrl: "https://script.google.com/macros/s/AKfycbxLqHmgRgooygm6IxHk4pNL7srNV5NABQZpoSwKD4HWlhz5kWMr46m9BTTKWuhoyRl5yA/exec",
    codnetworkApiKey: "",
    maintenanceMode: false
  }, null, 2), "utf8");
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

const readTrafficLogs = () => {
  try {
    const raw = fs.readFileSync(trafficLogsFile, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const writeTrafficLogs = (logs) => {
  fs.writeFileSync(trafficLogsFile, JSON.stringify(logs, null, 2), "utf8");
};

const readLeads = () => {
  try {
    return JSON.parse(fs.readFileSync(leadsFile, "utf8"));
  } catch {
    return [];
  }
};

const writeLeads = (leads) => {
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf8");
};

const readProductOverrides = () => {
  try {
    return JSON.parse(fs.readFileSync(productsOverrideFile, "utf8"));
  } catch {
    return {};
  }
};

const writeProductOverrides = (overrides) => {
  fs.writeFileSync(productsOverrideFile, JSON.stringify(overrides, null, 2), "utf8");
};

const readRedirects = () => {
  try {
    return JSON.parse(fs.readFileSync(redirectsFile, "utf8"));
  } catch {
    return [];
  }
};

const writeRedirects = (redirects) => {
  fs.writeFileSync(redirectsFile, JSON.stringify(redirects, null, 2), "utf8");
};

const readSettings = () => {
  try {
    return JSON.parse(fs.readFileSync(settingsFile, "utf8"));
  } catch {
    return {
      googleSheetsUrl: "https://script.google.com/macros/s/AKfycbxLqHmgRgooygm6IxHk4pNL7srNV5NABQZpoSwKD4HWlhz5kWMr46m9BTTKWuhoyRl5yA/exec",
      codnetworkApiKey: "",
      maintenanceMode: false
    };
  }
};

const writeSettings = (settings) => {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), "utf8");
};

// --- URL Redirect Middleware ---
app.use((req, res, next) => {
  // Only intercept GET requests that are not API calls or admin routes
  if (req.method === 'GET' && !req.path.startsWith('/api/') && !req.path.startsWith('/mojourney')) {
    const redirects = readRedirects();
    // Normalize path: strip trailing slash except for root
    const requestPath = req.path === '/' ? '/' : req.path.replace(/\/+$/, '');
    
    // Find active redirect
    const match = redirects.find(r => r.active && r.from === requestPath);
    if (match) {
      console.log(`Redirecting ${requestPath} -> ${match.to}`);
      return res.redirect(301, match.to);
    }
  }
  next();
});

app.use(express.json({ limit: "1mb" }));

// --- Admin Authentication Middleware ---
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access Denied: No Token Provided" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

app.get("/api/public/settings", (req, res) => {
  const settings = readSettings();
  res.json({ maintenanceMode: settings.maintenanceMode });
});

// --- Traffic Filtering & Geo-Fencing Middleware ---
const ksaTrafficFilter = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"]?.split(',')[0] || req.socket.remoteAddress;
  
  // Use geoip to check if IP is from SA
  const geo = geoip.lookup(ip);
  // For local testing (::1 or 127.0.0.1) we might want to bypass or mock, but let's strictly check:
  const isLocal = ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.');
  const isKSA = (geo && geo.country === "SA") || isLocal; // Allow local for testing
  const isVPN = false; // Placeholder for VPN check

  if (isKSA && !isVPN) {
    req.isValidKsaTraffic = true;
  } else {
    req.isValidKsaTraffic = false;
  }
  next();
};

app.post("/api/track", ksaTrafficFilter, (req, res) => {
  if (req.isValidKsaTraffic) {
    const logs = readTrafficLogs();
    logs.push({
      id: `TRK-${Date.now()}`,
      ip_address: req.headers["x-forwarded-for"]?.split(',')[0] || req.socket.remoteAddress,
      user_agent: req.headers["user-agent"],
      country_code: "SA",
      is_vpn_proxy: false,
      event_type: req.body.event_type || "page_view",
      path: req.body.path || "/",
      created_at: new Date().toISOString()
    });
    writeTrafficLogs(logs);
    return res.status(200).json({ message: "Tracked" });
  }
  return res.status(200).json({ message: "Ignored (Non-KSA or VPN)" });
});

app.post("/api/leads", (req, res) => {
  // Capture incomplete orders or abandoned carts
  const leads = readLeads();
  const leadData = req.body;
  const existingIndex = leads.findIndex(l => l.phone === leadData.phone && l.phone);
  
  if (existingIndex > -1) {
    leads[existingIndex] = { ...leads[existingIndex], ...leadData, updated_at: new Date().toISOString() };
  } else {
    leads.unshift({
      id: `LEAD-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: "Abandoned Cart",
      ...leadData
    });
  }
  writeLeads(leads);
  res.status(200).json({ message: "Lead saved" });
});

app.get("/api/products/overrides", (req, res) => {
  res.json(readProductOverrides());
});

// --- Admin Routes ---
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ id: "admin", role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token, message: "Logged in successfully" });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

app.get("/api/admin/metrics", verifyToken, (req, res) => {
  const orders = readOrders();
  const logs = readTrafficLogs();
  const leads = readLeads();
  
  const totalRevenue = orders.reduce((sum, order) => {
    // Only count if status is not RTO or pending
    if (order.status !== 'RTO') {
        return sum + (Number(order.total_price) || 0);
    }
    return sum;
  }, 0);

  const clicks = logs.filter(l => l.event_type === 'click' || l.event_type === 'page_view').length;
  const uniqueVisitors = new Set(logs.map(l => l.ip_address)).size;
  const totalOrders = orders.length;
  const conversionRate = uniqueVisitors > 0 ? ((totalOrders / uniqueVisitors) * 100).toFixed(1) : 0;
  
  // Paths tracking
  const pathCounts = logs.reduce((acc, log) => {
    if (log.path) {
      acc[log.path] = (acc[log.path] || 0) + 1;
    }
    return acc;
  }, {});

  res.json({
    clicks,
    uniqueVisitors,
    totalOrders,
    conversionRate,
    totalRevenue,
    leadsCount: leads.length,
    pathCounts
  });
});

app.get("/api/admin/leads", verifyToken, (req, res) => {
  res.json({ leads: readLeads() });
});

app.put("/api/admin/leads/:id/status", verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const leads = readLeads();
  const leadIndex = leads.findIndex(l => l.id === id);
  if (leadIndex > -1) {
    leads[leadIndex].status = status;
    writeLeads(leads);
    res.json({ message: "Status updated", lead: leads[leadIndex] });
  } else {
    res.status(404).json({ error: "Lead not found" });
  }
});

app.put("/api/admin/products/:productId", verifyToken, (req, res) => {
  const { productId } = req.params;
  const updates = req.body; // e.g. { price: 150, is_active: false }
  
  const overrides = readProductOverrides();
  overrides[productId] = { ...(overrides[productId] || {}), ...updates };
  writeProductOverrides(overrides);
  
  res.json({ message: "Product updated", overrides: overrides[productId] });
});

app.get("/api/admin/orders", verifyToken, (req, res) => {
  const orders = readOrders();
  res.json({ orders });
});

// --- URL Redirects Admin Endpoints ---
app.get("/api/admin/redirects", verifyToken, (req, res) => {
  res.json(readRedirects());
});

app.post("/api/admin/redirects", verifyToken, (req, res) => {
  const { from, to, active } = req.body;
  if (!from || !to) {
    return res.status(400).json({ error: "Missing 'from' or 'to' path." });
  }

  // Ensure 'from' starts with /
  let normalizedFrom = from.startsWith('/') ? from : '/' + from;
  if (normalizedFrom !== '/') normalizedFrom = normalizedFrom.replace(/\/+$/, '');

  const redirects = readRedirects();
  const existingIndex = redirects.findIndex(r => r.from === normalizedFrom);
  
  if (existingIndex > -1) {
    // Update existing
    redirects[existingIndex] = { ...redirects[existingIndex], to, active: active ?? true, updated_at: new Date().toISOString() };
  } else {
    // Add new
    redirects.push({
      id: `REDIR-${Date.now()}`,
      from: normalizedFrom,
      to,
      active: active ?? true,
      created_at: new Date().toISOString()
    });
  }
  
  writeRedirects(redirects);
  res.json({ message: "Redirect saved", redirects });
});

app.delete("/api/admin/redirects/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const redirects = readRedirects();
  const newRedirects = redirects.filter(r => r.id !== id);
  writeRedirects(newRedirects);
  res.json({ message: "Redirect deleted", redirects: newRedirects });
});

app.put("/api/admin/redirects/:id/status", verifyToken, (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  const redirects = readRedirects();
  const index = redirects.findIndex(r => r.id === id);
  if (index > -1) {
    redirects[index].active = active;
    writeRedirects(redirects);
    res.json({ message: "Status updated", redirect: redirects[index] });
  } else {
    res.status(404).json({ error: "Redirect not found" });
  }
});
// -------------------------------------

// --- Settings Admin Endpoints ---
app.get("/api/admin/settings", verifyToken, (req, res) => {
  res.json(readSettings());
});

app.put("/api/admin/settings", verifyToken, (req, res) => {
  const updates = req.body;
  const settings = readSettings();
  const newSettings = { ...settings, ...updates };
  writeSettings(newSettings);
  res.json({ message: "Settings updated", settings: newSettings });
});
// -------------------------------------

app.put("/api/admin/orders/:id/status", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const orders = readOrders();
  const orderIndex = orders.findIndex(o => o.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  orders[orderIndex].status = status;
  writeOrders(orders);

  if (status === "Confirmed") {
    // Logic to push to Codnetwork
    console.log(`Mocking push to Codnetwork for order ${id}...`);
    orders[orderIndex].codnetwork_reference_id = `CODNET-${Date.now()}`;
    orders[orderIndex].status = "Dispatched_To_Codnetwork";
    writeOrders(orders);
  }

  res.json({ message: "Order status updated successfully", order: orders[orderIndex] });
});

app.post("/api/admin/orders/:id/push", verifyToken, (req, res) => {
  const { id } = req.params;
  const orders = readOrders();
  const orderIndex = orders.findIndex(o => o.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  console.log(`Manual push to Codnetwork for order ${id}...`);
  orders[orderIndex].codnetwork_reference_id = `CODNET-${Date.now()}`;
  orders[orderIndex].status = "Dispatched_To_Codnetwork";
  writeOrders(orders);

  res.json({ message: "Successfully pushed to Codnetwork", order: orders[orderIndex] });
});
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "saftaa-care-hub" });
});

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
    finalProductName += " + شحن أولوية سريع وتأمين شامل (Premium Service)";
    finalSku += " + UPSELL-PRIORITY-SHIP";
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
  const settings = readSettings();
  if (settings.googleSheetsUrl) {
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

      await fetch(settings.googleSheetsUrl, {
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
