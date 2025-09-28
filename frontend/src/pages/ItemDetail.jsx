import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItemById, deleteItem } from "../services/api";

export default function ItemDetail({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  // Fetch the item by ID
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <p className="text-center mt-10">Loading item...</p>;

  const statusClass = item.status === "lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";

  // ✅ Delete function
  const handleDelete = async () => {
    if (!currentUser) return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(item._id);
        alert("Item deleted successfully!");
        navigate("/my-items"); // Redirect after deletion
      } catch (err) {
        console.error(err);
        alert("Failed to delete item");
      }
    }
  };

  // ✅ Check if the current user is the owner
  const isOwner = currentUser && currentUser._id === item.user?._id;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        {/* Image */}
        <div className="h-64 flex items-center justify-center bg-gradient-to-r from-indigo-400 to-purple-500 text-4xl text-white">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            "📦"
          )}
        </div>

        {/* Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <span className={`px-3 py-1 rounded-full text-sm ${statusClass}`}>{item.status.toUpperCase()}</span>
          <p className="mt-2"><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {item.date}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Contact:</strong> {item.user?.email || "N/A"}</p>

          {/* Delete Button (Owner only) */}
          {isOwner && (
            <button
              onClick={handleDelete}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
