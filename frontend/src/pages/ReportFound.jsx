import { useState } from "react";
import { addItem } from "../services/api"; // ✅ backend API

export default function ReportFound({ allItems, setAllItems, currentUser }) {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    image: null,
  });

  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ EXACT SAME STRUCTURE AS ReportLost
      const newItem = {
        name: formData.itemName,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        category: formData.category,
        status: "found", // 👈 ONLY DIFFERENCE
        image: formData.image,
      };

      const savedItem = await addItem(newItem);

      if (savedItem?._id) {
        setAllItems([savedItem, ...allItems]);
        alert("Found item reported successfully!");

        setFormData({
          itemName: "",
          description: "",
          location: "",
          date: new Date().toISOString().split("T")[0],
          category: "",
          image: null,
          user: currentUser._id,
        });
      } else {
        setError(savedItem?.message || "Error adding item");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };
console.log("CURRENT USER:", currentUser);
  return (
    <div className="pt-24 container mx-auto px-6">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-green-600 mb-6">
          Report Found Item
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
            required
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Location Found"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            required
          />

          <select
            className="w-full border p-2 rounded"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="personal">Personal</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
            <option value="other">Other</option>
          </select>

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
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Report Found Item
          </button>
        </form>
      </div>
    </div>
  );
}
