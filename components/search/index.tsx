"use client";

import { Hits, useSearchBox } from "react-instantsearch";
import "./index.css";
import { SetStateAction, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const refine = useSearchBox().refine;

  const handleSearch = (event: any) => {
    setQuery(event.currentTarget.value);
    refine(event.currentTarget.value);
  };
  function Hit({ hit }: any) {
    return (
      <article className="p-4 border rounded-lg shadow-md bg-white">
        <p className="font-semibold">{hit.title}</p>
        <p className="text-sm text-gray-600">{hit.description}</p>
      </article>
    );
  }

  function SearchBox({ refine }: any) {
    return (
      <>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            id="algolia_search"
            type="search"
            placeholder="Search for articles!"
            value={query}
            onChange={handleSearch}
          />
        </form>
      </>
    );
  }
  return (
    <>
      <SearchBox />
      {query.length > 3 && (
        <div>
          <Hits hitComponent={Hit} />
        </div>
      )}
    </>
  );
};
export default Search;
