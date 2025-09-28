import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import MyItems from "./pages/MyItems";
import GuestHome from "./pages/GuestHome";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ItemDetail from "./pages/ItemDetail";

function App() {
  const [allItems, setAllItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) setCurrentUser(JSON.parse(user));
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={currentUser ? <Dashboard allItems={allItems} /> : <GuestHome />} />
        <Route path="/search" element={<ProtectedRoute><Search allItems={allItems} /></ProtectedRoute>} />
        <Route path="/report-lost" element={<ProtectedRoute><ReportLost allItems={allItems} setAllItems={setAllItems} currentUser={currentUser} /></ProtectedRoute>} />
        <Route path="/report-found" element={<ProtectedRoute><ReportFound allItems={allItems} setAllItems={setAllItems} currentUser={currentUser} /></ProtectedRoute>} />
        <Route path="/item/:id" element={<ItemDetail currentUser={currentUser} />} />
        <Route path="/my-items" element={<ProtectedRoute><MyItems allItems={allItems} setAllItems={setAllItems} currentUser={currentUser} /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<RegisterPage setCurrentUser={setCurrentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
