import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import MainListItem from "../MainPages/MainListItem";
// import { twMerge } from "tailwind-merge";
import Card from "../Card";

function Pagination({ recordsPerPage, data, className, pageName,activeButton,handleUpdateFlag}) {
  const [currentPage, setCurrentPage] = useState(1);
 

  console.log(activeButton)
console.log(data)
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const lastPage = data ? Math.ceil(data.length / recordsPerPage) : 0;

const elementsStyle = className;

console.log(pageName)
console.log(activeButton)
  function prevPage() {
    setCurrentPage((currentPage) =>
      currentPage !== 1 ? currentPage - 1 : currentPage
    );
  }

  function nextPage() {
    setCurrentPage((currentPage) =>
      currentPage !== Math.ceil(lastPage) ? currentPage + 1 : currentPage
    );
  }

  const PageNumber = ({ pageNumber, style }) => {
    return (
      <div
        onClick={() => setCurrentPage(pageNumber)}
        className={twMerge(
          "h-10 px-5 flex justify-center items-center text-blue-500 transition-colors duration-150 focus:shadow-outline  cursor-pointer",
          style
        )}
      >
        {pageNumber}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div
          className={twMerge(
            " flex flex-col justify-center items-center ",
            elementsStyle
          )}
        >
        {
  data && data.length ? (
    data.slice(firstIndex, lastIndex).map((cardData, index) => (
      (pageName === "AdminMainPage" && (activeButton === "HOSTS" || activeButton === "PARTICIPANTS")) || 
      (pageName === "HostApplicationsPage" && (activeButton === "PENDING" || activeButton === "ACCEPTED")) ? (
        <MainListItem key={index} cardData={cardData} pageName={pageName} handleUpdateFlag={handleUpdateFlag}/>
      ) : (
        <Card key={index} cardData={cardData} pageName={pageName} handleUpdateFlag={handleUpdateFlag} />
      )
    ))
  ) : (
    <div>No data to display</div>
  )
}

        </div>

        <div className="bg-white p-4  flex  flex-wrap items-center justify-center mt-10 shadow-md shadow-blue-500 rounded-md">
          <nav aria-label="Page navigation">
            <ul className="inline-flex">
              <li>
                <Button
                  onClick={() => setCurrentPage(1)}
                  buttonStyle={`h-10 px-5 text-${
                    currentPage === 1 ? "white" : "blue-500"
                  } font-bold transition-colors duration-150 rounded-l-lg focus:shadow-outline ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-200 hover:bg-green-100 hover:text-blue-500"
                  }`}
                >
                  &lt;&lt;
                </Button>
              </li>
              <li>
                <Button
                  onClick={prevPage}
                  buttonStyle={`h-10 px-5 text-${
                    currentPage === 1 ? "white" : "blue-500"
                  } transition-colors duration-150 focus:shadow-outline ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed border-l-[0.1px] border-white"
                      : "hover:bg-green-100"
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                </Button>
              </li>

              {currentPage === 1 ? (
                <>
                  <li>
                    <PageNumber
                      pageNumber={currentPage}
                      style="text-white bg-blue-500 cursor-default border border-r-0 border-green-600 "
                    />
                  </li>
                  <li>
                    <PageNumber
                      pageNumber={currentPage + 1}
                      style="hover:bg-green-100"
                    />
                  </li>
                  <li>
                    <PageNumber
                      pageNumber={currentPage + 2}
                      style="hover:bg-green-100"
                    />
                  </li>
                </>
              ) : currentPage === lastPage ? (
                <>
                  <li>
                    <PageNumber
                      pageNumber={currentPage - 2}
                      style="hover:bg-green-100"
                    />
                  </li>
                  <li>
                    <PageNumber
                      pageNumber={currentPage - 1}
                      style="hover:bg-blue-100"
                    />
                  </li>
                  <li>
                    <PageNumber
                      pageNumber={currentPage}
                      style="text-white bg-blue-500 cursor-default border border-r-0 border-green-600 "
                    />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <PageNumber
                      pageNumber={currentPage - 1}
                      style="hover:bg-green-100"
                    />
                  </li>
                  <li>
                    <PageNumber
                      pageNumber={currentPage}
                      style="text-white bg-blue-500 cursor-default border border-r-0 border-green-600 "
                    />
                  </li>
                  <li>
                    <PageNumber
                      pageNumber={currentPage + 1}
                      style="hover:bg-green-100"
                    />
                  </li>
                </>
              )}

              <li>
                <Button
                  onClick={nextPage}
                  buttonStyle={`h-10 px-5 text-${
                    currentPage === lastPage ? "white" : "blue-500"
                  } transition-colors duration-150 ${
                    currentPage === lastPage
                      ? "bg-gray-300 cursor-not-allowed border-r-[0.1px] border-white"
                      : "bg-white focus:shadow-outline hover:bg-green-100"
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                  </svg>
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => setCurrentPage(lastPage)}
                  buttonStyle={`h-10 px-5 text-${
                    currentPage === lastPage ? "white" : "blue-500"
                  } font-bold transition-colors duration-150 rounded-r-lg focus:shadow-outline ${
                    currentPage === lastPage
                      ? "bg-gray-300 cursor-not-allowed "
                      : "bg-blue-200 hover:bg-green-100 hover:text-blue-500"
                  }`}
                >
                  &gt;&gt;
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Pagination;
