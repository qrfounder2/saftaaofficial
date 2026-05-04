import { products as localProducts } from "@/data/products";

const sortProducts = (items, sortBy) => {
  if (!sortBy) return items;
  const isDesc = sortBy.startsWith("-");
  const key = isDesc ? sortBy.slice(1) : sortBy;

  return [...items].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (aValue === bValue) return 0;
    if (aValue > bValue) return isDesc ? -1 : 1;
    return isDesc ? 1 : -1;
  });
};

const matchesFilter = (item, filters = {}) =>
  Object.entries(filters).every(([key, value]) => {
    if (value === undefined || value === null || value === "") return true;
    return item[key] === value;
  });

const readOrders = () => {
  try {
    const raw = window.localStorage.getItem("saftaa_orders_cache");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeOrders = (orders) => {
  window.localStorage.setItem("saftaa_orders_cache", JSON.stringify(orders));
};

const postOrder = async (orderData) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to create order");
  }
  return response.json();
};

export const storeClient = {
  entities: {
    Product: {
      filter: async (filters = {}, sortBy, limit) => {
        const filtered = localProducts.filter((item) => matchesFilter(item, filters));
        const sorted = sortProducts(filtered, sortBy);
        return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
      },
    },
    Order: {
      create: async (orderData) => {
        try {
          return await postOrder(orderData);
        } catch {
          const fallbackOrder = {
            ...orderData,
            id: `local-${Date.now()}`,
            created_at: new Date().toISOString(),
          };
          const orders = readOrders();
          writeOrders([fallbackOrder, ...orders]);
          return fallbackOrder;
        }
      },
    },
  },
};
