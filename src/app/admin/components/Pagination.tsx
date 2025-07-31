import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPages?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPages = 5,
  className = "",
}) => {
  // Generate array halaman yang akan ditampilkan
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfShow = Math.floor(showPages / 2);

    if (totalPages <= showPages) {
      // Jika total pages sedikit, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Selalu tampilkan halaman pertama
      pages.push(1);

      let start = Math.max(2, currentPage - halfShow);
      let end = Math.min(totalPages - 1, currentPage + halfShow);

      // Adjust jika terlalu dekat dengan awal atau akhir
      if (currentPage <= halfShow + 1) {
        end = Math.min(totalPages - 1, showPages - 1);
      }
      if (currentPage >= totalPages - halfShow) {
        start = Math.max(2, totalPages - showPages + 2);
      }

      // Tambahkan ellipsis jika perlu
      if (start > 2) {
        pages.push("...");
      }

      // Tambahkan halaman tengah
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Tambahkan ellipsis jika perlu
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Selalu tampilkan halaman terakhir
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number | string) => {
    if (
      typeof page === "number" &&
      page !== currentPage &&
      page >= 1 &&
      page <= totalPages
    ) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={`flex items-center justify-center space-x-2 ${className} `}
      aria-label="Pagination Navigation"
    >
      <span className="mr-2 text-white">
        Page {currentPage} of {totalPages}
      </span>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`
          relative flex items-center justify-center w-10 h-10 rounded-lg
          backdrop-blur-md bg-white/10 border border-white/20
          shadow-lg transition-all duration-300 group
          hover:bg-white/20 hover:border-white/30 hover:scale-105
          active:scale-95 active:bg-white/30
          disabled:opacity-50 disabled:cursor-not-allowed 
          disabled:hover:scale-100 disabled:hover:bg-white/10
          focus:outline-none focus:ring-2 focus:ring-blue-400/50
        `}
        aria-label="Previous page"
      >
        <ChevronLeft
          size={18}
          className="text-white group-hover:text-gray-800 transition-colors"
        />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <div className="flex items-center justify-center w-10 h-10">
                <MoreHorizontal size={18} className="text-gray-500" />
              </div>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`
                  relative flex items-center justify-center w-10 h-10 rounded-lg
                  backdrop-blur-md border transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-400/50
                  font-medium text-sm
                  ${
                    currentPage === page
                      ? "bg-blue-500/80 border-blue-400/50 text-white shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:scale-105 active:scale-95"
                  }
                `}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
                {currentPage === page && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-blue-600/20" />
                )}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          relative flex items-center justify-center w-10 h-10 rounded-lg
          backdrop-blur-md bg-white/10 border border-white/20
          shadow-lg transition-all duration-300 group
          hover:bg-white/20 hover:border-white/30 hover:scale-105
          active:scale-95 active:bg-white/30
          disabled:opacity-50 disabled:cursor-not-allowed 
          disabled:hover:scale-100 disabled:hover:bg-white/10
          focus:outline-none focus:ring-2 focus:ring-blue-400/50
        `}
        aria-label="Next page"
      >
        <ChevronRight
          size={18}
          className="text-white group-hover:text-gray-800 transition-colors"
        />
      </button>

      {/* Page Info */}
      <div className="ml-4 px-3 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20">
        <span className="text-sm text-white font-medium">
          {currentPage} / {totalPages}
        </span>
      </div>
    </nav>
  );
};

export default Pagination;
