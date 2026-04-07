import { Link } from "react-router-dom";

// Navbar component with logo, search bar, and user profile/sign-in
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black text-white sticky top-0 z-50">

      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-xl cursor-pointer">☰</span>
        <h1 className="text-red-500 font-bold text-lg">YouTube</h1>
      </div>

      {/* Search */}
      <div className="flex w-1/2">
        <input
          placeholder="Search"
          className="w-full px-4 py-1 bg-gray-900 border border-gray-700 rounded-l-full"
        />
        <button className="px-4 bg-gray-800 rounded-r-full">🔍</button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              className="rounded-full"
            />
            <span>{user.name}</span>
          </div>
        ) : (
          // Show sign-in button if no user is logged in
          <Link to="/login" className="border px-4 py-1 rounded-full">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;