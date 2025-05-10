import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAdminOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-5 flex justify-between items-center shadow-xl sticky top-0 z-50">
      <div className="text-white font-extrabold text-3xl tracking-tight select-none">
        Leave Management
      </div>

      <nav className="flex items-center gap-12 text-white font-semibold tracking-wide text-lg">
        <Link
          to="/"
          className="relative group"
        >
          Dashboard
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded"></span>
        </Link>

        <Link
          to="/employee-request"
          className="relative group"
        >
          Employee Request Form
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded"></span>
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setAdminOpen(!adminOpen)}
            className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-yellow-400 hover:text-indigo-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-expanded={adminOpen}
            aria-haspopup="true"
          >
            Admin
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${adminOpen ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {adminOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-indigo-900 rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <Link
                to="/admin/employee-list"
                className="block px-5 py-3 hover:bg-yellow-400 hover:text-indigo-900 transition-colors duration-300 rounded-t-lg"
              >
                Employee List
              </Link>
              <Link
                to="/admin/leave-requests"
                className="block px-5 py-3 hover:bg-yellow-400 hover:text-indigo-900 transition-colors duration-300 rounded-b-lg"
              >
                Leave Requests Approval
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
