"use client";
import { createContext, useState } from "react";

type ContextProps = {
  searchQuery: string;
  handleSearchQuery: (query: string) => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext<ContextProps | null>(null);

function SearchContextProvider({ children }: ProviderProps) {
  // state
  const [searchQuery, setSearchQuery] = useState<string>("");

  // handlers
  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <SearchContext.Provider value={{ searchQuery, handleSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
export default SearchContextProvider;
