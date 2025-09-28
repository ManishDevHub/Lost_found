import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch items:", err);
        setItems([]);
      }
    };
    fetchData();
  }, []);

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="pt-24 container mx-auto px-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Search Items</h2>

      <input
        type="text"
        placeholder="Search by name, description, location, or category..."
        className="w-full border p-2 rounded mb-6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredItems.length === 0 ? (
        <p className="text-gray-600">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
