const categories = ["All", "React", "Music", "Gaming", "News", "Programming"];
// Filters component to display category filter buttons
const Filters = ({ setFilter }) => {
  return (
    <div className="flex gap-2 p-3 overflow-x-auto bg-black">

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className="bg-gray-800 text-white px-3 py-1 rounded-full"
        >
          {cat}
        </button>
      ))}

    </div>
  );
};

export default Filters;