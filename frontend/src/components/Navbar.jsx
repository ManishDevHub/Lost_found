import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install: npm install lucide-react

export default function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
    setIsOpen(false); // close mobile menu on logout
  };

  // ✅ Reusable links
  const userLinks = (
    <>
      <Link to="/search" onClick={() => setIsOpen(false)} className="hover:text-indigo-600">
        Search
      </Link>
      <Link to="/report-lost" onClick={() => setIsOpen(false)} className="hover:text-indigo-600">
        Report Lost
      </Link>
      <Link to="/report-found" onClick={() => setIsOpen(false)} className="hover:text-indigo-600">
        Report Found
      </Link>
      <Link to="/my-items" onClick={() => setIsOpen(false)} className="hover:text-indigo-600">
        My Items
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <img
            className="h-9 w-9"
            src="https://clipart-library.com/2023/lost-property.jpg"
            alt="Logo"
          />
          <h2>L&F</h2>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          {currentUser && userLinks}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-indigo-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md flex flex-col gap-3 px-6 py-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-indigo-600">
            Home
          </Link>
          {currentUser && userLinks}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
