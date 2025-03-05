"use client";

import { useAtom } from "jotai";
import { pageAtom } from "@/lib/store";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

export default function Pagination({ totalItems, itemsPerPage }: any) {
  const [page, setPage] = useAtom(pageAtom);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-0 mt-10">
      <div className="-mt-px flex w-0 flex-1">
        {totalPages > 1 && (
          <a
            onClick={() => page > 1 && setPage(page - 1)}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </a>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {getPageNumbers().map((pageNumber) => (
          <a
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`hover:cursor-pointer inline-flex items-center border-t-2 ${pageNumber === page ? "border-undp-red text-undp-red hover:text-red-800" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} px-4 pt-4 text-sm font-medium`}
          >
            {pageNumber}
          </a>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {totalPages > 1 && (
          <a
            onClick={() => page < 10 && setPage(page + 1)}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </a>
        )}
      </div>
    </nav>
  );
}
