import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { getItems, deleteItem } from "../services/api"; // ✅ backend API
import { useNavigate } from "react-router-dom";

export default function Dashboard({ currentUser }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Fetch items from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchData();
  }, []);

  // Delete item handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        // Remove deleted item from state
        setItems((prev) => prev.filter((item) => item._id !== id));
        alert("Item deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to delete item");
      }
    }
  };

  const totalItems = items.length;
  const lostItems = items.filter((i) => i.status === "lost").length;
  const foundItems = items.filter((i) => i.status === "found").length;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="h-[50vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Lost Something? Found Something?
        </h1>
        <p className="text-base sm:text-lg max-w-2xl">
          Connect with your college community and help each other find lost belongings.
        </p>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-indigo-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-indigo-600">{totalItems}</h3>
            <p className="text-gray-700 font-medium">Total Items</p>
          </div>
          <div className="bg-red-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-red-600">{lostItems}</h3>
            <p className="text-gray-700 font-medium">Lost Items</p>
          </div>
          <div className="bg-green-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-green-600">{foundItems}</h3>
            <p className="text-gray-700 font-medium">Found Items</p>
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">
          Recent Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.slice(-6).map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              currentUser={currentUser}
              onDelete={handleDelete} // ✅ pass delete handler
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-10">
          How It Works
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">1. Report Lost</h3>
            <p className="text-gray-600">
              Lost something? Post details and help others identify your item.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">2. Report Found</h3>
            <p className="text-gray-600">
              Found something? Share info so the rightful owner can contact you.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">3. Search Items</h3>
            <p className="text-gray-600">
              Browse or search through all posted lost & found items easily.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 py-8 bg-gray-900 text-gray-300 text-center">
        <p>
          © {new Date().getFullYear()} Lost & Found Portal. All rights reserved.
        </p>
        <p className="text-sm mt-1">Built with ❤️ using React & TailwindCSS</p>
      </footer>
    </div>
  );
}
