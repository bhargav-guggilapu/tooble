import React from "react";

function SearchResults({ results }) {
  return (
    <div
      className={`mx-auto w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-56 ${
        results.length === 0 && "hidden"
      }`}
    >
      <p className="text-gray-600 text-md mb-5 mt-3">
        About {results.searchInformation?.formattedTotalResults} results (
        {results.searchInformation?.formattedSearchTime} seconds)
      </p>
      {results.items?.map((result, i) => {
        return (
          <div key={i} className="max-w-xl mb-8">
            <div className="group">
              <a href={result.link} className="text-sm">
                {result.formattedUrl}
              </a>
              <a href={result.link}>
                <h2 className="truncate text-xl text-blue-800 font-medium group-hover:underline">
                  {result.title}
                </h2>
              </a>
            </div>
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {result.snippet}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
