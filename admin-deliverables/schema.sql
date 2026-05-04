-- SQL Migration for Safta COD Dashboard

-- Enable UUID extension if using PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for Order Statuses
CREATE TYPE cod_order_status AS ENUM (
    'Pending_Confirmation',
    'Confirmed',
    'Dispatched_To_Codnetwork',
    'In_Transit',
    'Delivered_Paid',
    'RTO'
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL, -- Must validate +966 or 05x on application level
    shipping_address TEXT NOT NULL,
    total_sar DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status cod_order_status DEFAULT 'Pending_Confirmation',
    codnetwork_reference_id VARCHAR(255) -- Stores the ID returned after pushing to Codnetwork
);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price_sar DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Traffic Logs (For KSA Only Valid Clicks)
CREATE TABLE traffic_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    country_code VARCHAR(2) DEFAULT 'SA', -- Should always be SA for valid traffic
    is_vpn_proxy BOOLEAN DEFAULT FALSE,
    event_type VARCHAR(50) NOT NULL, -- e.g., 'page_view', 'click', 'conversion'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_traffic_created_at ON traffic_logs(created_at);
CREATE INDEX idx_traffic_country ON traffic_logs(country_code);
