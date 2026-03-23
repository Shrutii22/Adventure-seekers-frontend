function SearchBar() {
  return (
    <div className="flex bg-white rounded-full shadow-xl overflow-hidden mt-4">

      <input
        type="text"
        placeholder="Search destinations..."
        className="px-6 py-3 w-80 outline-none text-gray-700"
      />

      <button className="bg-sky-500 text-white px-6 hover:bg-sky-600 transition">
        Search
      </button>

    </div>
  );
}

export default SearchBar;