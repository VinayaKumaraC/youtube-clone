import { Link } from "react-router-dom";
// Navbar component with search and user authentication links
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black text-white sticky top-0 z-50">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <span className="text-xl cursor-pointer">☰</span>
        <h1 className="text-red-500 font-bold text-lg">YouTube</h1>
      </div>

      {/* SEARCH */}
      <div className="flex w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-1 bg-gray-900 border border-gray-700 rounded-l-full"
        />
        <button className="px-4 bg-gray-800 rounded-r-full">🔍</button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>👤 {user.name}</span>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

    </div>
  );
};

export default Navbar;