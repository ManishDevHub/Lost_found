import { Link } from "react-router-dom";

export default function ItemCard({ item, onDelete, currentUser }) {
  const statusClass = item.status === "lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";
  const itemId = item._id || item.id;
  

  const isOwner = currentUser && item.user && (String(item.user._id) === String(currentUser._id));

  // Date ko acche se format karne ke liye
  const formattedDate = new Date(item.date).toLocaleDateString();

  return (
    <div className="relative bg-white shadow-lg rounded-xl flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      
      {/* Image/Icon Section */}
      <div className="h-48 flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-4xl text-white">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          "📦"
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{item.name}</h3>
        
        <div className="mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${statusClass}`}>
            {item.status.toUpperCase()}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-1">
          <strong>Location:</strong> {item.location}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Date:</strong> {formattedDate}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          <strong>Description:</strong> {item.description}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Contact:</strong> {item.user?.email || "N/A"}
        </p>

        {/* Buttons Section */}
        <div className="mt-auto flex space-x-3">
          <Link
            to={`/item/${itemId}`}
            className="flex-grow block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-center transition-colors duration-200 text-sm font-medium"
          >
            View Details
          </Link>
          
          {/* Delete Button - Ownership check fixed with String() comparison */}
          {isOwner && onDelete && (
            <button
              onClick={() => typeof onDelete === 'function' && onDelete(item._id)}
              className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}