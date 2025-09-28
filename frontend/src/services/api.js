const API_URL = process.env.VITE_REACT_APP_BACKEND_BASEURL  // or any URL


// Helper: get token
const getToken = () => localStorage.getItem("token");

// ======================== AUTH ========================
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Failed to login");
  const data = await res.json();

  // ✅ Store token in localStorage
  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

export const getMe = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
};

// ======================== ITEMS ========================

export const addItem = async (itemData) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const formData = new FormData();
  for (const key in itemData) formData.append(key, itemData[key]);

  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
};

export const getItems = async () => {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
};

export const getItemById = async (id) => {
  const res = await fetch(`${API_URL}/items/${id}`);
  if (!res.ok) throw new Error("Failed to fetch item");
  return res.json();
};

export const deleteItem = async (id) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
};
