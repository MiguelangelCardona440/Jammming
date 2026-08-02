import { useState } from "react";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    if (!term.trim()) {
      return;
    }
    onSearch(term);
  };
  return (
    <div className="search-bar">
      <div className="search-control">
        <input
          type="text"
          placeholder="Search artists, songs or albums"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button className="search-button" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
