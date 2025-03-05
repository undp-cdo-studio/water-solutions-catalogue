import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Breadcrumbs({ currentPage }: any) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-undp-red hover:text-red-800">
              <span>Home</span>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="h-5 w-5 flex-shrink-0 text-undp-red hover:text-red-800"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <Link
              href="/solutions"
              className={`text-undp-red hover:text-red-800 ml-4 text-sm font-medium `}
            >
              Solution Results
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="h-5 w-5 flex-shrink-0 text-undp-red hover:text-red-800"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <a
              className={`text-gray-500 hover:text-gray-700 ml-4 text-sm font-medium `}
              aria-current={"page"}
            >
              {currentPage}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
}
