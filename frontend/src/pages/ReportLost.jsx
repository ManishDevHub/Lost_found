import { useState } from "react";
import { addItem } from "../services/api"; // ✅ backend API

export default function ReportLost({ allItems, setAllItems, currentUser }) {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    image: null,
  });
  const [error, setError] = useState(null);

  // ✅ Handle image as File (not Base64)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // ✅ Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = {
        name: formData.itemName,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        category: formData.category,
        status: "lost", // 👈 lost item
        image: formData.image,
      };

      const savedItem = await addItem(newItem); // API call
      if (savedItem._id) {
        setAllItems([savedItem, ...allItems]); // ✅ Update UI
        alert("Lost item reported successfully!");
        setFormData({
          itemName: "",
          description: "",
          location: "",
          date: new Date().toISOString().split("T")[0],
          category: "",
          image: null,
        });
      } else {
        setError(savedItem.message || "Error adding item");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="pt-24 container mx-auto px-6">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Report Lost Item</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
            required
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Location Lost"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <select
            className="w-full border p-2 rounded"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="personal">Personal</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
            <option value="other">Other</option>
          </select>

          {/* Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded"
          >
            Report Lost Item
          </button>
        </form>
      </div>
    </div>
  );
}

