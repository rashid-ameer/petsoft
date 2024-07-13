"use client";

import { useSearchContext } from "@/lib/hooks";

function SearchForm() {
  const { searchQuery, handleSearchQuery } = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        type="text"
        className="w-full h-full bg-white/20 outline-none hover:bg-white/30 focus-within:bg-white/10 rounded-md px-4 placeholder:text-white/50"
        placeholder="Search pets..."
        value={searchQuery}
        onChange={(e) => handleSearchQuery(e.target.value)}
      />
    </form>
  );
}
export default SearchForm;
