import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getItems, getMe, deleteItem } from "../services/api";

export default function MyItems() {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getMe(); 
        setCurrentUser(user);

        const allItems = await getItems();
        
        // 🚀 FIX: IDs को String में बदलकर तुलना करें
        const myItems = allItems.filter((item) => {
          const itemCreatorId = item.user?._id;
          const currentUserId = user._id;
          
          if (!itemCreatorId || !currentUserId) return false;
          
          // String comparison ensures MongoDB ObjectIds match correctly
          return String(itemCreatorId) === String(currentUserId);
        });
        
        setItems(myItems);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="pt-24 container mx-auto px-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">My Reported Items</h2>

      {items.length === 0 ? (
        <p className="text-gray-600">You have not reported any items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              currentUser={currentUser}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}