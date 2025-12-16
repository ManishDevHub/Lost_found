import { Link } from "react-router-dom";

export default function ItemCard({ item, onDelete, currentUser }) {
  const statusClass =
    item.status === "lost"
      ? "bg-red-100 text-red-600"
      : "bg-green-100 text-green-600";

  const itemId = item._id || item.id;

  // ✅ Owner check (string + populated dono handle)
  const itemUserId =
    typeof item.user === "object" ? item.user._id : item.user;

  const isOwner =
    currentUser && itemUserId &&
    String(itemUserId) === String(currentUser._id);

  const formattedDate = new Date(item.date).toLocaleDateString();

  return (
    <div className="relative bg-white shadow-lg rounded-xl flex flex-col h-full hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="h-48 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-4xl text-white">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          "📦"
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2">{item.name}</h3>

        <span
          className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}
        >
          {item.status.toUpperCase()}
        </span>

        <p className="text-sm text-gray-600">
          <strong>Location:</strong> {item.location}
        </p>

        <p className="text-sm text-gray-600">
          <strong>Date:</strong> {formattedDate}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
          <strong>Description:</strong> {item.description}
        </p>

        <p className="text-sm text-gray-600 mt-2">
          <strong>Contact:</strong> {item.user?.email || "N/A"}
        </p>

        {/* Buttons */}
        <div className="mt-auto flex gap-2 pt-4">
          <Link
            to={`/item/${itemId}`}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            View Details
          </Link>

          {isOwner && onDelete && (
            <button
              onClick={() => onDelete(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
