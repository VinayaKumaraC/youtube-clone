import { Link } from "react-router-dom";

// Top navigation bar (YouTube style)
const Navbar = () => {

  // Get token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black text-white sticky top-0">

      {/* Left section */}
      <div className="flex items-center gap-3">
        <span className="text-xl cursor-pointer">☰</span>
        <h1 className="text-red-500 font-bold">YouTube</h1>
      </div>

      {/* Search bar */}
      <div className="flex w-1/2">
        <input
          placeholder="Search"
          className="w-full px-4 py-1 bg-gray-900 border border-gray-700 rounded-l-full"
        />
        <button className="px-4 bg-gray-800 rounded-r-full">🔍</button>
      </div>

      {/* Right section (Auth UI) */}
      <div className="flex gap-4 items-center">

        {user ? (
          // If logged in
          <div className="flex items-center gap-2">
            <span>👤 User</span>

            {/* Logout button */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload(); // refresh UI
              }}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          // If not logged in
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default Navbar;