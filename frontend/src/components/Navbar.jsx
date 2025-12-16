import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
    setIsOpen(false);
  };

  const userLinks = (
    <>
      <Link to="/search" onClick={() => setIsOpen(false)}>Search</Link>
      <Link to="/report-lost" onClick={() => setIsOpen(false)}>Report Lost</Link>
      <Link to="/report-found" onClick={() => setIsOpen(false)}>Report Found</Link>
      <Link to="/my-items" onClick={() => setIsOpen(false)}>My Items</Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <img
            src="https://clipart-library.com/2023/lost-property.jpg"
            alt="Logo"
            className="h-8 w-8"
          />
          L&F
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/">Home</Link>
          {currentUser && userLinks}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          {currentUser && userLinks}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
