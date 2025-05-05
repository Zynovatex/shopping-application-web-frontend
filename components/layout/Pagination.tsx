import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [1, 2, 3, "...", totalPages];

  return (
    <div className="flex items-center justify-center mt-6">
      <nav className="flex items-center space-x-2 border rounded-lg p-1 shadow-lg bg-white">
        {/* Previous Button with Text */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              currentPage === page
                ? "bg-gray-800 text-white font-bold"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button with Text */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          Next
          <ChevronRight className="w-4 h-3 ml-1" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
