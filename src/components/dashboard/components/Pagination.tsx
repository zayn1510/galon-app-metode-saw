import { FaChevronLeft, FaChevronRight, FaEllipsisH } from 'react-icons/fa';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5; // Maximum number of visible page buttons
    
    // Always show first page
    visiblePages.push(1);
    
    // Calculate start and end of middle pages
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're near the start or end
    if (currentPage <= 3) {
      end = Math.min(4, totalPages - 1);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 3, 2);
    }
    
    // Add ellipsis if there's a gap between first and middle pages
    if (start > 2) {
      visiblePages.push('left-ellipsis');
    }
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        visiblePages.push(i);
      }
    }
    
    // Add ellipsis if there's a gap between middle and last pages
    if (end < totalPages - 1) {
      visiblePages.push('right-ellipsis');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }
    
    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <FaChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Page Number Buttons */}
      {visiblePages.map((page, index) => {
        if (page === 'left-ellipsis' || page === 'right-ellipsis') {
          return (
            <span key={page} className="px-3 py-1 text-gray-500">
              <FaEllipsisH className="w-4 h-4" />
            </span>
          );
        }
        
        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <FaChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
}