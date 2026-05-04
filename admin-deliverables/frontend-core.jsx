import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Assume lucide-react or similar is available for icons
import { LayoutDashboard, ShoppingCart, Settings, X, Truck, CheckCircle } from 'lucide-react';

// --- Helper: KSA Phone Validation ---
const isValidKSAPhone = (phone) => {
    // Matches +9665xxxxxxxx or 05xxxxxxxx
    const regex = /^(?:\+966|0)?5\d{8}$/;
    return regex.test(phone.replace(/\s+/g, ''));
};

// --- Mock Data ---
const mockChartData = [
    { date: 'Mon', clicks: 120, orders: 12 },
    { date: 'Tue', clicks: 150, orders: 15 },
    { date: 'Wed', clicks: 180, orders: 20 },
    { date: 'Thu', clicks: 130, orders: 14 },
    { date: 'Fri', clicks: 210, orders: 25 },
    { date: 'Sat', clicks: 250, orders: 30 },
    { date: 'Sun', clicks: 300, orders: 40 },
];

const mockOrders = [
    { id: 'ORD-1001', date: '2026-05-04 10:30', customer_name: 'Fahad Al-Harbi', phone: '+966501234567', total_sar: 350.00, status: 'Pending_Confirmation' },
    { id: 'ORD-1002', date: '2026-05-04 11:15', customer_name: 'Sara Al-Otaibi', phone: '0559876543', total_sar: 120.00, status: 'Confirmed' },
    { id: 'ORD-1003', date: '2026-05-03 16:45', customer_name: 'Ahmed Youssef', phone: '+966531112222', total_sar: 450.00, status: 'Dispatched_To_Codnetwork' },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-emerald-600">Safta Admin</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
                    </button>
                    <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'orders' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <ShoppingCart className="w-5 h-5 mr-3" /> Orders
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center px-4 py-2 rounded-md ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <Settings className="w-5 h-5 mr-3" /> Settings
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header / Date Picker */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
                    <select 
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={selectedDateRange}
                        onChange={(e) => setSelectedDateRange(e.target.value)}
                    >
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>Last 7 Days</option>
                        <option>This Month</option>
                        <option>Custom</option>
                    </select>
                </header>

                <div className="flex-1 overflow-auto p-8">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6">
                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <KpiCard title="Total Valid Clicks" value="1,340" />
                                <KpiCard title="Total Orders" value="156" />
                                <KpiCard title="Conversion Rate" value="11.6%" />
                                <KpiCard title="Total Revenue (SAR)" value="SAR 24,500.00" />
                            </div>

                            {/* Chart */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-96">
                                <h3 className="text-lg font-medium mb-4">Clicks vs Orders ({selectedDateRange})</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mockChartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Line type="monotone" dataKey="clicks" stroke="#3B82F6" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Order ID</th>
                                        <th className="px-6 py-3 font-medium">Date</th>
                                        <th className="px-6 py-3 font-medium">Customer Name</th>
                                        <th className="px-6 py-3 font-medium">Phone Number</th>
                                        <th className="px-6 py-3 font-medium">Total (SAR)</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockOrders.map((order) => (
                                        <tr 
                                            key={order.id} 
                                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            <td className="px-6 py-4 font-medium text-emerald-600">{order.id}</td>
                                            <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                            <td className="px-6 py-4">{order.customer_name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`${isValidKSAPhone(order.phone) ? 'text-gray-900' : 'text-red-500 font-medium'}`}>
                                                    {order.phone}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{order.total_sar.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={order.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Order Preview Drawer (Modal) */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold">Order Preview</h2>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Order Details</h3>
                                <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                                    <p><span className="font-medium">ID:</span> {selectedOrder.id}</p>
                                    <p><span className="font-medium">Date:</span> {selectedOrder.date}</p>
                                    <p><span className="font-medium">Status:</span> <StatusBadge status={selectedOrder.status} /></p>
                                    <p><span className="font-medium">Total:</span> SAR {selectedOrder.total_sar.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Customer & Shipping</h3>
                                <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                                    <p><span className="font-medium">Name:</span> {selectedOrder.customer_name}</p>
                                    <p>
                                        <span className="font-medium">Phone:</span> {selectedOrder.phone} 
                                        {!isValidKSAPhone(selectedOrder.phone) && <span className="text-red-500 ml-2">(Invalid KSA Format)</span>}
                                    </p>
                                    <p><span className="font-medium">Address:</span> Riyadh, Al Olaya Dist, KSA (Mock)</p>
                                </div>
                            </div>

                            {/* Codnetwork Action */}
                            <div className="pt-4 border-t border-gray-100">
                                <button 
                                    className="w-full flex justify-center items-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
                                    onClick={() => alert('Triggering push to Codnetwork API...')}
                                    disabled={selectedOrder.status === 'Dispatched_To_Codnetwork' || selectedOrder.status === 'Delivered_Paid'}
                                >
                                    <Truck className="w-4 h-4 mr-2" />
                                    Push to Codnetwork
                                </button>
                                <p className="text-xs text-center text-gray-500 mt-2">
                                    Automatically triggers on "Confirmed" status update.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- Reusable Components ---
const KpiCard = ({ title, value }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
);

const StatusBadge = ({ status }) => {
    const statusStyles = {
        'Pending_Confirmation': 'bg-yellow-100 text-yellow-800',
        'Confirmed': 'bg-blue-100 text-blue-800',
        'Dispatched_To_Codnetwork': 'bg-indigo-100 text-indigo-800',
        'In_Transit': 'bg-purple-100 text-purple-800',
        'Delivered_Paid': 'bg-green-100 text-green-800',
        'RTO': 'bg-red-100 text-red-800',
    };
    
    const style = statusStyles[status] || 'bg-gray-100 text-gray-800';
    const label = status.replace(/_/g, ' ');

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>
            {label}
        </span>
    );
};
