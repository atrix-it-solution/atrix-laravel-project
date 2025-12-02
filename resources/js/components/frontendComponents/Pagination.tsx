import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  // Handler to scroll to the top of the page
  const handlePageChange = (newPage: number) => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    onPageChange(newPage);
  };

  return (
    <div className="flex items-center gap-x-1" aria-label="Pagination">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gradient-to-r from-blue-400 to-green-400 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
        aria-label="Previous"
      >
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-x-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none ${
              currentPage === i + 1
                ? "bg-amber-700 text-amber-400 bg-gradient-to-r from-blue-400 to-green-400  dark:text-white"
                : "text-redhover:bg-red dark:text-red dark:hover:bg-white/10"
            }`}
            aria-current={currentPage === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=" min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gradient-to-r from-blue-400 to-green-400 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
        aria-label="Next"
      >
        <span>Next</span>
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
