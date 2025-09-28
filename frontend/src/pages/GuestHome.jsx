import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/api";

export default function GuestHome() {
  const [items, setItems] = useState([]);

  // Fetch items from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        // Sort items by creation date descending (newest first)
        const sortedItems = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Take only the first 6 items
        setItems(sortedItems.slice(0, 6));
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to Lost & Found Portal
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl">
          Sign in to report lost items, found items, and connect with your community.
        </p>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-indigo-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-indigo-600">120+</h3>
            <p className="text-gray-700 font-medium">Total Items</p>
          </div>
          <div className="bg-red-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-red-600">75+</h3>
            <p className="text-gray-700 font-medium">Lost Items</p>
          </div>
          <div className="bg-green-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-green-600">45+</h3>
            <p className="text-gray-700 font-medium">Found Items</p>
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Recent Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              currentUser={null} // Guest view
              onDelete={null}    // Disable delete button
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-10">How It Works</h2>
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
        <p>© {new Date().getFullYear()} Lost & Found Portal. All rights reserved.</p>
        <p className="text-sm mt-1">Built with ❤️ using React & TailwindCSS</p>
      </footer>
    </div>
  );
}
