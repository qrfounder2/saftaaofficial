import express from 'express';
import jwt from 'jsonwebtoken';
import geoip from 'geoip-lite'; // Placeholder for MaxMind integration
import axios from 'axios';
// import { db } from './db'; // Assume db is a configured pg/knex instance

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// --- 1. Authentication Middleware ---
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid Token' });
    }
};

// --- Admin Login Route ---
router.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Verify against environment variables (Lightweight auth)
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ id: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
        return res.json({ token, message: 'Logged in successfully' });
    }
    
    return res.status(401).json({ error: 'Invalid credentials' });
});

// --- 2. Traffic Filtering & Geo-Fencing Middleware ---
const ksaTrafficFilter = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // In production, use official MaxMind API or @maxmind/geoip2-node
    const geo = geoip.lookup(ip); 
    const isKSA = geo && geo.country === 'SA';
    
    // Placeholder for secondary VPN detection API
    // const vpnCheck = await axios.get(`https://vpn-detect.api/?ip=${ip}&key=${process.env.VPN_DETECTION_API_KEY}`);
    const isVPN = false; // Assume vpnCheck.data.is_vpn

    if (isKSA && !isVPN) {
        // Log valid KSA traffic
        // await db.query('INSERT INTO traffic_logs (ip_address, user_agent, country_code, is_vpn_proxy, event_type) VALUES ($1, $2, $3, $4, $5)', [ip, req.headers['user-agent'], 'SA', false, 'page_view']);
        req.isValidKsaTraffic = true;
    } else {
        req.isValidKsaTraffic = false;
        // Do not log, but allow request to continue for view-only purposes if it's a storefront route
    }
    next();
};

// Example tracking endpoint
router.post('/api/track', ksaTrafficFilter, (req, res) => {
    if (req.isValidKsaTraffic) {
        // Traffic was logged in middleware
        return res.status(200).json({ message: 'Tracked' });
    }
    // Drop data silently for VPN/Non-KSA
    return res.status(200).json({ message: 'Ignored' });
});

// --- 3. Fulfillment Automation (Codnetwork) ---
const pushToCodnetwork = async (orderId) => {
    // Fetch order details from DB
    // const order = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    const mockOrder = {
        id: orderId,
        customer_name: 'Ahmed Al-Saud',
        phone: '+966501234567',
        address: 'Riyadh, KSA',
        total_sar: 250.00,
        items: [{ name: 'Health Supplement', qty: 1, price: 250.00 }]
    };

    try {
        const response = await axios.post(
            `${process.env.CODNETWORK_API_URL}/orders`,
            {
                merchant_order_id: mockOrder.id,
                customer_name: mockOrder.customer_name,
                customer_phone: mockOrder.phone,
                shipping_address: mockOrder.address,
                cod_amount: mockOrder.total_sar,
                items: mockOrder.items
            },
            {
                headers: { 'Authorization': `Bearer ${process.env.CODNETWORK_API_KEY}` }
            }
        );

        // Update DB with reference ID and status
        // await db.query('UPDATE orders SET status = $1, codnetwork_reference_id = $2 WHERE id = $3', ['Dispatched_To_Codnetwork', response.data.reference_id, orderId]);
        
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Codnetwork Push Failed:', error.message);
        return { success: false, error: error.message };
    }
};

// --- Order Management Routes ---

// Get all orders (Protected)
router.get('/api/admin/orders', verifyToken, async (req, res) => {
    // const orders = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json({ orders: [] }); // Mock response
});

// Update order status and conditionally push to Codnetwork
router.put('/api/admin/orders/:id/status', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // e.g., 'Confirmed'

    // Update status in DB
    // await db.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);

    if (status === 'Confirmed') {
        const pushResult = await pushToCodnetwork(id);
        if (!pushResult.success) {
            return res.status(500).json({ error: 'Status updated, but failed to push to Codnetwork', details: pushResult.error });
        }
    }

    res.json({ message: 'Order status updated successfully' });
});

// Manual Push to Codnetwork
router.post('/api/admin/orders/:id/push', verifyToken, async (req, res) => {
    const { id } = req.params;
    const result = await pushToCodnetwork(id);
    if (result.success) {
        res.json({ message: 'Successfully pushed to Codnetwork', data: result.data });
    } else {
        res.status(500).json({ error: 'Push failed', details: result.error });
    }
});

export default router;
