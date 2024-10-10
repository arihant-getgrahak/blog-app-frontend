"use client"

import { SearchBox, Hits,useHits } from "react-instantsearch";

export const Search = () => {
    // const { items, sendEvent } = useHits(props);
  function Hit({ hit }: any) {
    return (
      <article>
        <img src={hit.image} alt={hit.name} />
        <p>{hit.title}</p>
        <p>{hit.description}</p>
      </article>
    );
  }

  return (
    <>
      <SearchBox />
      <Hits hitComponent={Hit} />
    </>
  );
};
