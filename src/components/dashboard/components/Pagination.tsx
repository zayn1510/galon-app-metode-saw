import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform hover:scale-105"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Number Buttons */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            currentPage === page
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-200 hover:bg-blue-500 text-gray-700 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform hover:scale-105"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
