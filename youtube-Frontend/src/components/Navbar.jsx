export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black text-white">
      <h1 className="text-xl font-bold">YouTube</h1>

      <input
        type="text"
        placeholder="Search"
        className="px-4 py-1 rounded bg-gray-800 w-1/3"
      />

      <div>
        <button className="bg-red-600 px-3 py-1 rounded">Sign In</button>
      </div>
    </div>
  );
}