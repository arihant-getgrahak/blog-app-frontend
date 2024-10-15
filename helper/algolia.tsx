"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";

export const Algolia = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const searchClient = algoliasearch(
    "9FOQ7X4VOL",
    "257827a56b2f42d593bf09d8302c2f4e"
  );
  return (
    <html lang="en">
      <body>
        <InstantSearch searchClient={searchClient} indexName="blogs">
          {children}
        </InstantSearch>
      </body>
    </html>
  );
};
