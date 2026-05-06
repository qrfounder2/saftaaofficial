import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LayoutDashboard, ShoppingCart, Settings, X, Truck, LogOut, Package, Activity, Users, FileText, ToggleLeft, ToggleRight, Edit2, Save, Link as LinkIcon, Trash2, Download, Menu } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { products as initialProducts } from '@/data/products';

const isValidKSAPhone = (phone) => {
  const regex = /^(?:\+966|0)?5\d{8}$/;
  return regex.test((phone || '').replace(/\s+/g, ''));
};

const StatusBadge = ({ status }) => {
  const statusStyles = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'Pending_Confirmation': 'bg-yellow-100 text-yellow-800',
      'Confirmed': 'bg-blue-100 text-blue-800',
      'Dispatched_To_Codnetwork': 'bg-indigo-100 text-indigo-800',
      'In_Transit': 'bg-purple-100 text-purple-800',
      'Delivered_Paid': 'bg-green-100 text-green-800',
      'RTO': 'bg-red-100 text-red-800',
      'Abandoned Cart': 'bg-gray-100 text-gray-800',
      'Recovered': 'bg-green-100 text-green-800'
  };
  
  const style = statusStyles[status] || 'bg-gray-100 text-gray-800';
  const label = (status || '').replace(/_/g, ' ');

  return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>
          {label}
      </span>
  );
};

const KpiCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-start justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
      {Icon && <div className="p-3 bg-emerald-50 rounded-full text-emerald-600"><Icon className="w-5 h-5" /></div>}
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDateRange, setSelectedDateRange] = useState('All Time');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [orders, setOrders] = useState([]);
  const [leads, setLeads] = useState([]);
  const [products, setProducts] = useState([]);
  const [redirects, setRedirects] = useState([]);
  const [storeSettings, setStoreSettings] = useState({ googleSheetsUrl: '', codnetworkApiKey: '', maintenanceMode: false });
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Redirect form state
  const [newRedirect, setNewRedirect] = useState({ from: '', to: '' });

  const [metrics, setMetrics] = useState({ clicks: 0, uniqueVisitors: 0, totalOrders: 0, conversionRate: 0, totalRevenue: 0, leadsCount: 0, pathCounts: {} });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');
  const [redirectSearch, setRedirectSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [productDrafts, setProductDrafts] = useState({});
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/mojourney');
      return;
    }

    try {
      if (!loading) setRefreshing(true);
      const [ordersRes, metricsRes, leadsRes, productsOverridesRes, redirectsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/orders', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/metrics', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/leads', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/products/overrides', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/redirects', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/settings', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (ordersRes.status === 401 || ordersRes.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/mojourney');
        return;
      }

      const ordersData = await ordersRes.json();
      const metricsData = await metricsRes.json();
      const leadsData = await leadsRes.json();
      const overridesData = await productsOverridesRes.json();
      const redirectsData = await redirectsRes.json();
      const settingsData = await settingsRes.json();

      setOrders(ordersData.orders || []);
      setMetrics(metricsData || { clicks: 0, uniqueVisitors: 0, totalOrders: 0, conversionRate: 0, totalRevenue: 0, leadsCount: 0, pathCounts: {} });
      setLeads(leadsData.leads || []);
      setRedirects(redirectsData || []);
      setStoreSettings(settingsData || { googleSheetsUrl: '', codnetworkApiKey: '', maintenanceMode: false });

      // Merge initial products with backend overrides
      const mergedProducts = initialProducts.map(p => ({
        ...p,
        ...(overridesData[p.id] || {})
      }));
      setProducts(mergedProducts);

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Realtime simulation (poll every 30s)
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  const updateOrderStatus = async (id, status) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        toast({ title: "تم التحديث", description: "تم تحديث حالة الطلب بنجاح" });
        fetchDashboardData();
        if (selectedOrder && selectedOrder.id === id) {
          setSelectedOrder({ ...selectedOrder, status });
        }
      }
    } catch (e) {
      toast({ title: "خطأ", description: "حدث خطأ أثناء التحديث", variant: "destructive" });
    }
  };

  const pushToCodnetwork = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/orders/${id}/push`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast({ title: "تم الإرسال", description: "تم إرسال الطلب إلى شركة الشحن" });
        fetchDashboardData();
        setSelectedOrder(null);
      }
    } catch (e) {
      toast({ title: "خطأ", description: "فشل الإرسال", variant: "destructive" });
    }
  };

  const saveProductUpdate = async (productId, updates) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        toast({ title: "تم التحديث", description: "تم تحديث المنتج بنجاح" });
        fetchDashboardData();
        setEditingProduct(null);
      }
    } catch (e) {
      toast({ title: "خطأ", description: "فشل تحديث المنتج", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/mojourney');
  };

  const handleToggleProductActive = (product) => {
    saveProductUpdate(product.id, { is_active: !product.is_active });
  };

  const startEditingProduct = (product) => {
    setEditingProduct(product.id);
    setProductDrafts((prev) => ({
      ...prev,
      [product.id]: {
        price: product.price,
        stock: product.stock,
      },
    }));
  };

  const updateProductDraft = (productId, field, value) => {
    setProductDrafts((prev) => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || {}),
        [field]: value,
      },
    }));
  };

  const handleAddRedirect = async (e) => {
    e.preventDefault();
    if (!newRedirect.from || !newRedirect.to) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/redirects`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(newRedirect)
      });
      if (res.ok) {
        toast({ title: "تم الإضافة", description: "تم إنشاء رابط التحويل بنجاح" });
        setNewRedirect({ from: '', to: '' });
        fetchDashboardData();
      }
    } catch (e) {
      toast({ title: "خطأ", description: "فشل إنشاء رابط التحويل", variant: "destructive" });
    }
  };

  const handleDeleteRedirect = async (id) => {
    if (!confirm("هل أنت متأكد من حذف رابط التحويل هذا؟")) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/redirects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast({ title: "تم الحذف", description: "تم حذف رابط التحويل بنجاح" });
        fetchDashboardData();
      }
    } catch (e) {
      toast({ title: "خطأ", description: "فشل الحذف", variant: "destructive" });
    }
  };

  const handleToggleRedirect = async (id, currentStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/redirects/${id}/status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus })
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (e) {
      toast({ title: "خطأ", description: "فشل تحديث الحالة", variant: "destructive" });
    }
  };

  const handleUpdateSetting = async (key, value) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      });
      if (res.ok) {
        toast({ title: "تم الحفظ", description: "تم تحديث الإعدادات بنجاح" });
        fetchDashboardData();
      }
    } catch (e) {
      toast({ title: "خطأ", description: "فشل تحديث الإعدادات", variant: "destructive" });
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + (row[header] || '')).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50">جاري التحميل...</div>;
  }

  const getDateThreshold = () => {
    const now = new Date();
    const start = new Date(now);
    switch (selectedDateRange) {
      case 'Today':
        start.setHours(0, 0, 0, 0);
        return start;
      case 'Yesterday':
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        return start;
      case 'Last 7 Days':
        start.setDate(start.getDate() - 7);
        return start;
      case 'This Month':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        return start;
      default:
        return null;
    }
  };

  const dateThreshold = getDateThreshold();
  const filteredOrders = dateThreshold
    ? orders.filter((order) => new Date(order.created_at) >= dateThreshold)
    : orders;
  const filteredLeads = dateThreshold
    ? leads.filter((lead) => new Date(lead.created_at) >= dateThreshold)
    : leads;

  const rangeRevenue = filteredOrders.reduce((sum, order) => {
    if (order.status !== 'RTO') {
      return sum + (Number(order.total_price) || 0);
    }
    return sum;
  }, 0);

  const displayedMetrics = {
    ...metrics,
    totalOrders: filteredOrders.length,
    totalRevenue: rangeRevenue,
    leadsCount: filteredLeads.length,
  };

  const normalizedProductSearch = productSearch.trim().toLowerCase();
  const normalizedOrderSearch = orderSearch.trim().toLowerCase();
  const normalizedLeadSearch = leadSearch.trim().toLowerCase();
  const normalizedRedirectSearch = redirectSearch.trim().toLowerCase();

  const visibleProducts = products.filter((product) => {
    if (!normalizedProductSearch) return true;
    return (
      product.name?.toLowerCase().includes(normalizedProductSearch) ||
      product.id?.toLowerCase().includes(normalizedProductSearch)
    );
  });

  const visibleOrders = filteredOrders.filter((order) => {
    const matchesSearch = !normalizedOrderSearch || [
      order.id,
      order.customer_name,
      order.phone,
      order.product_name,
    ].some((value) => (value || '').toString().toLowerCase().includes(normalizedOrderSearch));
    const matchesStatus =
      orderStatusFilter === 'all' ||
      (order.status || 'Pending_Confirmation') === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const visibleLeads = filteredLeads.filter((lead) => {
    const matchesSearch = !normalizedLeadSearch || [
      lead.id,
      lead.phone,
      lead.product_name,
      lead.status,
    ].some((value) => (value || '').toString().toLowerCase().includes(normalizedLeadSearch));
    const matchesStatus = leadStatusFilter === 'all' || (lead.status || '') === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const visibleRedirects = redirects.filter((redirect) => {
    if (!normalizedRedirectSearch) return true;
    return (
      (redirect.from || '').toLowerCase().includes(normalizedRedirectSearch) ||
      (redirect.to || '').toLowerCase().includes(normalizedRedirectSearch)
    );
  });

  const pathData = Object.entries(metrics.pathCounts || {}).map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans relative" dir="ltr">
        {/* Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside className={`fixed lg:static inset-y-0 left-0 w-72 lg:w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-40 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <span className="text-xl font-bold text-emerald-600 tracking-tight">Safta Dashboard</span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                <button onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-2.5 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}>
                    <LayoutDashboard className="w-5 h-5 mr-3" /> Overview
                </button>
                <button onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-2.5 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}>
                    <ShoppingCart className="w-5 h-5 mr-3" /> Orders
                </button>
                <button onClick={() => { setActiveTab('products'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-2.5 rounded-md transition-colors ${activeTab === 'products' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}>
                    <Package className="w-5 h-5 mr-3" /> Products
                </button>
                <button onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-2.5 rounded-md transition-colors ${activeTab === 'analytics' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}>
                    <Activity className="w-5 h-5 mr-3" /> Analytics & Traffic
                </button>
                <button onClick={() => { setActiveTab('leads'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-2.5 rounded-md transition-colors flex justify-between ${activeTab === 'leads' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}>
                    <div className="flex items-center"><Users className="w-5 h-5 mr-3" /> Leads Sheet</div>
                    {displayedMetrics.leadsCount > 0 && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{displayedMetrics.leadsCount}</span>}
                </button>
                <button onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-2.5 rounded-md transition-colors ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}>
                    <Settings className="w-5 h-5 mr-3" /> Store Settings
                </button>
                <button onClick={() => { setActiveTab('redirects'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-2.5 rounded-md transition-colors ${activeTab === 'redirects' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}>
                    <LinkIcon className="w-5 h-5 mr-3" /> URL Redirects
                </button>
            </nav>
            <div className="p-4 border-t border-gray-200">
                <button onClick={handleLogout} className="w-full flex items-center px-4 py-2.5 rounded-md text-red-600 hover:bg-red-50 font-medium transition-colors">
                    <LogOut className="w-5 h-5 mr-3" /> Logout
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-50/50">
            <header className="min-h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 shadow-sm z-0 gap-3">
                <div className="flex items-center gap-3">
                  <button
                    className="lg:hidden p-2 rounded-md border border-gray-200 text-gray-700"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800 capitalize">{activeTab.replace('_', ' ')}</h1>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Live Sync Active</span>
                  {refreshing && <span className="text-xs text-gray-500">Refreshing...</span>}
                  <select 
                      className="border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-gray-700"
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                  >
                      <option>All Time</option>
                      <option>Today</option>
                      <option>Yesterday</option>
                      <option>Last 7 Days</option>
                      <option>This Month</option>
                  </select>
                </div>
            </header>

            <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                
                {/* 1. DASHBOARD OVERVIEW */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <KpiCard title="Valid Visitors (KSA)" value={metrics.uniqueVisitors.toLocaleString()} icon={Users} />
                            <KpiCard title="Total Orders" value={displayedMetrics.totalOrders.toLocaleString()} icon={ShoppingCart} />
                            <KpiCard title="Conversion Rate" value={`${metrics.conversionRate}%`} icon={Activity} />
                            <KpiCard title="Total Revenue (SAR)" value={`SAR ${displayedMetrics.totalRevenue.toLocaleString()}`} icon={FileText} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm col-span-2">
                              <h3 className="text-lg font-bold text-gray-800 mb-6">Traffic & Order Correlation</h3>
                              <div className="h-72">
                                  <ResponsiveContainer width="100%" height="100%">
                                      <LineChart data={[{name: 'Start', visitors: 0, orders: 0}, {name: 'Now', visitors: metrics.uniqueVisitors, orders: displayedMetrics.totalOrders}]}>
                                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                          <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                          <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                          <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                                          <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                                      </LineChart>
                                  </ResponsiveContainer>
                              </div>
                          </div>
                          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Leads</h3>
                            <div className="space-y-4">
                              {filteredLeads.slice(0, 4).map(lead => (
                                <div key={lead.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100">
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900">{lead.phone || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</p>
                                  </div>
                                  <StatusBadge status={lead.status} />
                                </div>
                              ))}
                              {filteredLeads.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No recent leads captured in selected range.</p>}
                            </div>
                            <button onClick={() => setActiveTab('leads')} className="w-full mt-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors">
                              View All Leads
                            </button>
                          </div>
                        </div>
                    </div>
                )}

                {/* 2. PRODUCTS TAB (MICRO-FEATURES) */}
                {activeTab === 'products' && (
                    <div className="space-y-6 max-w-7xl mx-auto">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
                        <h2 className="text-xl font-bold text-gray-800">Product Management</h2>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                            placeholder="Search product by name or ID"
                            className="w-full sm:w-72 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                          />
                          <span className="text-sm text-gray-500 hidden sm:inline">Auto-syncs with storefront</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {visibleProducts.map(product => (
                          <div key={product.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:shadow-md">
                            <div className="flex items-center gap-4 flex-1">
                              <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 bg-gray-50" />
                              <div>
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">{product.name}</h3>
                                <p className="text-xs text-gray-500 font-mono mt-1">{product.id}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                              {editingProduct === product.id ? (
                                <div className="flex items-center gap-2 flex-wrap">
                                  <input 
                                    type="number" 
                                    value={productDrafts[product.id]?.price ?? product.price}
                                    onChange={(e) => updateProductDraft(product.id, 'price', e.target.value)}
                                    className="w-24 px-2 py-1 border rounded text-sm"
                                  />
                                  <input 
                                    type="number" 
                                    value={productDrafts[product.id]?.stock ?? product.stock}
                                    onChange={(e) => updateProductDraft(product.id, 'stock', e.target.value)}
                                    className="w-20 px-2 py-1 border rounded text-sm"
                                  />
                                  <button onClick={() => {
                                    const draft = productDrafts[product.id] || {};
                                    saveProductUpdate(product.id, { price: Number(draft.price), stock: Number(draft.stock) });
                                  }} className="p-1.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200">
                                    <Save className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => setEditingProduct(null)} className="p-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs">
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-6">
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500 font-medium">Price (SAR)</p>
                                    <p className="font-bold text-gray-900">{product.price}</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500 font-medium">Stock</p>
                                    <p className={`font-bold ${product.stock < 20 ? 'text-red-600' : 'text-gray-900'}`}>{product.stock}</p>
                                  </div>
                                  <button onClick={() => startEditingProduct(product)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                              
                              <div className="border-l border-gray-200 pl-6 flex items-center gap-3">
                                <span className="text-xs font-medium text-gray-600 w-12">{product.is_active ? 'Active' : 'Hidden'}</span>
                                <button onClick={() => handleToggleProductActive(product)} className={`p-1 rounded-full transition-colors ${product.is_active ? 'text-emerald-500' : 'text-gray-400'}`}>
                                  {product.is_active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {visibleProducts.length === 0 && (
                          <div className="text-center py-10 text-gray-500 bg-white border border-gray-200 rounded-xl">
                            No products match your search.
                          </div>
                        )}
                      </div>
                    </div>
                )}

                {/* 3. ANALYTICS & TRAFFIC */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6 max-w-7xl mx-auto">
                      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h3 className="text-lg font-bold text-gray-800 mb-6">Top Visitor Paths</h3>
                          {pathData.length === 0 ? (
                            <div className="h-64 flex items-center justify-center text-sm text-gray-500">
                              No analytics data yet.
                            </div>
                          ) : (
                          <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={pathData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                      <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                      <YAxis dataKey="path" type="category" width={150} stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                                      <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                                      <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                                  </BarChart>
                              </ResponsiveContainer>
                          </div>
                          )}
                      </div>
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 flex items-center justify-between">
                        <div>
                          <h4 className="text-emerald-800 font-bold text-lg mb-1">Traffic Shield Active</h4>
                          <p className="text-emerald-600 text-sm">Non-KSA traffic and VPNs are currently being filtered out from analytics to ensure 100% clean data.</p>
                        </div>
                        <div className="p-3 bg-white rounded-full shadow-sm"><ShieldCheckIcon className="w-8 h-8 text-emerald-500" /></div>
                      </div>
                    </div>
                )}

                {/* 4. LEADS SHEET */}
                {activeTab === 'leads' && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-7xl mx-auto">
                        <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                          <h2 className="text-lg font-bold text-gray-800">Abandoned Carts & Incomplete Orders</h2>
                          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <input
                              type="text"
                              value={leadSearch}
                              onChange={(e) => setLeadSearch(e.target.value)}
                              placeholder="Search by phone, status, or product"
                              className="w-full sm:w-72 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <select
                              value={leadStatusFilter}
                              onChange={(e) => setLeadStatusFilter(e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                            >
                              <option value="all">All statuses</option>
                              <option value="Abandoned Cart">Abandoned Cart</option>
                              <option value="Recovered">Recovered</option>
                            </select>
                            <button onClick={() => exportToCSV(visibleLeads, 'leads')} className="text-sm bg-white border border-gray-300 px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 shadow-sm flex items-center justify-center gap-2">
                              <Download className="w-4 h-4" /> Export to CSV
                            </button>
                          </div>
                        </div>
                        <div className="overflow-x-auto hidden md:block">
                        <table className="w-full min-w-[720px] text-left text-sm whitespace-nowrap">
                            <thead className="bg-white border-b border-gray-200 text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Lead ID / Date</th>
                                    <th className="px-6 py-4 font-semibold">Phone Number</th>
                                    <th className="px-6 py-4 font-semibold">Product Intent</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visibleLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                          <p className="font-mono text-xs text-gray-500">{lead.id}</p>
                                          <p className="text-sm font-medium text-gray-900">{new Date(lead.created_at).toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">{lead.phone || 'N/A'}</td>
                                        <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{lead.product_name || 'Browsing'}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={lead.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                          <a href={`https://wa.me/${(lead.phone || '').replace('+', '')}`} target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-800 font-medium text-sm flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-md w-max transition-colors">
                                            WhatsApp
                                          </a>
                                        </td>
                                    </tr>
                                ))}
                                {visibleLeads.length === 0 && (
                                  <tr><td colSpan="5" className="text-center py-12 text-gray-500 font-medium">No leads recorded yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                        <div className="md:hidden p-4 space-y-3">
                          {visibleLeads.map((lead) => (
                            <div key={lead.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <p className="text-xs font-mono text-gray-500">{lead.id}</p>
                                  <p className="font-semibold text-gray-900">{lead.phone || 'N/A'}</p>
                                </div>
                                <StatusBadge status={lead.status} />
                              </div>
                              <p className="text-sm text-gray-600 mt-2">{lead.product_name || 'Browsing'}</p>
                            </div>
                          ))}
                          {visibleLeads.length === 0 && <p className="text-sm text-center text-gray-500 py-6">No leads found.</p>}
                        </div>
                    </div>
                )}

                {/* 5. ORDERS TABLE */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-7xl mx-auto">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <input
                              type="text"
                              value={orderSearch}
                              onChange={(e) => setOrderSearch(e.target.value)}
                              placeholder="Search by order, phone, customer..."
                              className="w-full sm:w-72 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <select
                              value={orderStatusFilter}
                              onChange={(e) => setOrderStatusFilter(e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                            >
                              <option value="all">All statuses</option>
                              <option value="pending">Pending</option>
                              <option value="Pending_Confirmation">Pending Confirmation</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Dispatched_To_Codnetwork">Dispatched</option>
                              <option value="In_Transit">In Transit</option>
                              <option value="Delivered_Paid">Delivered</option>
                              <option value="RTO">RTO</option>
                            </select>
                          </div>
                          <button onClick={() => exportToCSV(visibleOrders, 'orders')} className="text-sm bg-white border border-gray-300 px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 shadow-sm flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Export to CSV
                          </button>
                        </div>
                        <div className="overflow-x-auto hidden md:block">
                        <table className="w-full min-w-[840px] text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Order ID</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Phone Number</th>
                                    <th className="px-6 py-4 font-semibold">Total (SAR)</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visibleOrders.map((order) => (
                                    <tr 
                                        key={order.id} 
                                        className="hover:bg-emerald-50/50 cursor-pointer transition-colors"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <td className="px-6 py-4 font-mono font-medium text-emerald-600">{order.id}</td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleString()}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.customer_name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`${isValidKSAPhone(order.phone) ? 'text-gray-900 font-medium' : 'text-red-500 font-bold'}`}>
                                                {order.phone}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">{Number(order.total_price).toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.status || 'Pending_Confirmation'} />
                                        </td>
                                    </tr>
                                ))}
                                {visibleOrders.length === 0 && (
                                  <tr><td colSpan="6" className="text-center py-12 text-gray-500 font-medium">No orders found.</td></tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                        <div className="md:hidden p-4 space-y-3">
                          {visibleOrders.map((order) => (
                            <button
                              key={order.id}
                              className="w-full text-left border border-gray-200 rounded-lg p-4 bg-white"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <p className="font-mono text-xs text-emerald-700">{order.id}</p>
                                  <p className="font-semibold text-gray-900">{order.customer_name}</p>
                                  <p className="text-xs text-gray-500">{order.phone}</p>
                                </div>
                                <StatusBadge status={order.status || 'Pending_Confirmation'} />
                              </div>
                              <p className="text-sm text-gray-600 mt-2">SAR {Number(order.total_price).toFixed(2)}</p>
                            </button>
                          ))}
                          {visibleOrders.length === 0 && <p className="text-sm text-center text-gray-500 py-6">No orders found.</p>}
                        </div>
                    </div>
                )}

                {/* 6. SETTINGS */}
                {activeTab === 'settings' && (
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">Store Configuration</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Google Sheets Webhook URL</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none" 
                              value={storeSettings.googleSheetsUrl} 
                              onChange={(e) => setStoreSettings({...storeSettings, googleSheetsUrl: e.target.value})}
                            />
                            <button 
                              onClick={() => handleUpdateSetting('googleSheetsUrl', storeSettings.googleSheetsUrl)}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-bold hover:bg-emerald-700"
                            >Save</button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Updates to Google Sheets are managed directly from the backend.</p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Codnetwork API Key</label>
                          <div className="flex gap-2">
                            <input 
                              type="password" 
                              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none" 
                              value={storeSettings.codnetworkApiKey} 
                              onChange={(e) => setStoreSettings({...storeSettings, codnetworkApiKey: e.target.value})}
                              placeholder="••••••••••••••••" 
                            />
                            <button 
                              onClick={() => handleUpdateSetting('codnetworkApiKey', storeSettings.codnetworkApiKey)}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-bold hover:bg-emerald-700"
                            >Save</button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm">Store Status</h4>
                            <p className="text-xs text-gray-500">Temporarily disable storefront (Maintenance Mode)</p>
                          </div>
                          <button onClick={() => {
                            const newStatus = !storeSettings.maintenanceMode;
                            setStoreSettings({...storeSettings, maintenanceMode: newStatus});
                            handleUpdateSetting('maintenanceMode', newStatus);
                          }} className={`p-1 rounded-full transition-colors ${storeSettings.maintenanceMode ? 'text-red-500' : 'text-emerald-500'}`}>
                            {storeSettings.maintenanceMode ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                    </div>
                )}

                {/* 7. URL REDIRECTS */}
                {activeTab === 'redirects' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <div className="mb-6">
                          <h2 className="text-xl font-bold text-gray-800">URL Redirects</h2>
                          <p className="text-sm text-gray-500 mt-1">Redirect visitors from old links to new pages instantly. Useful for marketing campaigns or out-of-stock items.</p>
                        </div>

                        <form onSubmit={handleAddRedirect} className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 space-y-4">
                          <h3 className="text-sm font-bold text-gray-700">Create URL Redirect</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Redirect from</label>
                              <input 
                                type="text" 
                                placeholder="e.g., /shop/shoes" 
                                value={newRedirect.from}
                                onChange={(e) => setNewRedirect({...newRedirect, from: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Redirect to</label>
                              <input 
                                type="text" 
                                placeholder="https://..." 
                                value={newRedirect.to}
                                onChange={(e) => setNewRedirect({...newRedirect, to: e.target.value})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button 
                              type="submit" 
                              disabled={!newRedirect.from || !newRedirect.to}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 shadow-sm"
                            >
                              Save Redirect
                            </button>
                          </div>
                        </form>

                        <div className="mb-4">
                          <input
                            type="text"
                            value={redirectSearch}
                            onChange={(e) => setRedirectSearch(e.target.value)}
                            placeholder="Search redirects by source or destination"
                            className="w-full md:w-96 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                          />
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-200 text-gray-500">
                              <tr>
                                <th className="px-4 py-3 font-semibold">Redirect from</th>
                                <th className="px-4 py-3 font-semibold">Redirect to</th>
                                <th className="px-4 py-3 font-semibold text-center">Status</th>
                                <th className="px-4 py-3 font-semibold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {visibleRedirects.map(redirect => (
                                <tr key={redirect.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-4 font-medium text-gray-900 font-mono text-xs">{redirect.from}</td>
                                  <td className="px-4 py-4 text-gray-600 truncate max-w-xs">{redirect.to}</td>
                                  <td className="px-4 py-4 text-center">
                                    <button onClick={() => handleToggleRedirect(redirect.id, redirect.active)} className={`p-1 rounded-full transition-colors inline-block ${redirect.active ? 'text-emerald-500' : 'text-gray-400'}`}>
                                      {redirect.active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                                    </button>
                                  </td>
                                  <td className="px-4 py-4 text-right">
                                    <button onClick={() => handleDeleteRedirect(redirect.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                              {visibleRedirects.length === 0 && (
                                <tr>
                                  <td colSpan="4" className="text-center py-8 text-gray-500">No redirects configured.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                )}

            </div>
        </main>

        {/* Order Preview Drawer (Modal) */}
        {selectedOrder && (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedOrder(null)}></div>
                <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900">Order Preview</h2>
                        <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors bg-white shadow-sm border border-gray-200">
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Order Details</h3>
                            <div className="bg-gray-50 p-5 rounded-xl space-y-3 text-sm border border-gray-100">
                                <div className="flex justify-between"><span className="text-gray-500">ID</span> <span className="font-mono font-medium">{selectedOrder.id}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Date</span> <span className="font-medium text-gray-900">{new Date(selectedOrder.created_at).toLocaleString()}</span></div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                  <span className="text-gray-500">Status</span> 
                                  <select 
                                    className="border border-gray-300 rounded-md text-xs px-2 py-1.5 bg-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={selectedOrder.status || 'Pending_Confirmation'}
                                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="Pending_Confirmation">Pending Confirmation</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Dispatched_To_Codnetwork">Dispatched To Codnetwork</option>
                                    <option value="In_Transit">In Transit</option>
                                    <option value="Delivered_Paid">Delivered Paid</option>
                                    <option value="RTO">RTO</option>
                                  </select>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-gray-200"><span className="text-gray-500">Total</span> <span className="font-bold text-emerald-600 text-base">SAR {Number(selectedOrder.total_price).toFixed(2)}</span></div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Customer & Shipping</h3>
                            <div className="bg-gray-50 p-5 rounded-xl space-y-3 text-sm border border-gray-100">
                                <div className="flex justify-between"><span className="text-gray-500">Name</span> <span className="font-medium">{selectedOrder.customer_name}</span></div>
                                <div className="flex flex-col items-end gap-1 pt-2 border-t border-gray-200">
                                    <div className="flex justify-between w-full"><span className="text-gray-500">Phone</span> <span className="font-bold">{selectedOrder.phone}</span></div>
                                    {!isValidKSAPhone(selectedOrder.phone) && <span className="text-red-500 text-xs bg-red-50 px-2 py-0.5 rounded font-medium border border-red-100">Invalid KSA Format</span>}
                                </div>
                                <div className="flex flex-col pt-2 border-t border-gray-200 space-y-1">
                                  <span className="text-gray-500">Address</span> 
                                  <span className="font-medium text-gray-900 bg-white p-2 rounded border border-gray-200">{selectedOrder.city} - {selectedOrder.address}</span>
                                </div>
                                {selectedOrder.notes && (
                                  <div className="flex flex-col pt-2 border-t border-gray-200 space-y-1">
                                    <span className="text-gray-500">Notes</span>
                                    <span className="text-gray-700 bg-yellow-50 p-2 rounded border border-yellow-100 italic">{selectedOrder.notes}</span>
                                  </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Product</h3>
                            <div className="bg-gray-50 p-5 rounded-xl space-y-3 text-sm border border-gray-100">
                                <div className="flex flex-col space-y-1">
                                  <span className="text-gray-500">Item</span> 
                                  <span className="font-semibold text-gray-900">{selectedOrder.product_name}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-gray-200"><span className="text-gray-500">Quantity</span> <span className="font-bold bg-white px-2 py-0.5 rounded border border-gray-200">{selectedOrder.quantity_pack || 1}</span></div>
                            </div>
                        </div>

                    </div>
                    <div className="p-6 border-t border-gray-200 bg-white">
                        <button 
                            className="w-full flex justify-center items-center py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-md shadow-emerald-200 disabled:opacity-50 disabled:shadow-none disabled:bg-gray-400"
                            onClick={() => pushToCodnetwork(selectedOrder.id)}
                            disabled={selectedOrder.status === 'Dispatched_To_Codnetwork' || selectedOrder.status === 'Delivered_Paid' || selectedOrder.status === 'RTO'}
                        >
                            <Truck className="w-5 h-5 mr-2" />
                            Push to Codnetwork Fulfillment
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-3 font-medium">
                            Status automatically triggers to "Dispatched" upon success.
                        </p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

// Inline missing icon
const ShieldCheckIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
