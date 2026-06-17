import React from "react";

function SearchBar() {
  return (
    <>
      <div className="relative w-full max-w-xl mx-auto bg-white rounded ">
        <input
          placeholder="e.g. Blog"
          className="rounded-md w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md shadow-blue-500 hover:outline-none focus:ring-teal-200 focus:border-teal-200"
          type="text"
          name="query"
          id="query"
        />
        <button
          type="submit"
          className="absolute inline-flex items-center h-10 px-3 md:px-3 lg:px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-md outline-none right-3 top-3 bg-green-500 sm:px-6 sm:text-base sm:font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <svg
            className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBar;
