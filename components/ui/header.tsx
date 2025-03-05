"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-white transition duration-300 ease-in-out ${!top ? " backdrop-blur-sm shadow-lg" : " "}`}
    >
      <div className="max-w-full mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="https://www.undp.org/nature/our-work-areas/water-governance"
                  target="_blank"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  About Water at UNDP
                </Link>
              </li>
              <li className="flex-align flex items-center">
                {/* <MapPinIcon className="-ml-2" height={32} width={32}/> */}
                {/* <Link
                  href="#0"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  New York
                </Link> */}
              </li>
              {/* <li>
                <Link href="/signup" className="btn-sm rounded-none text-gray-100 bg-undp-blue hover:bg-sky-800 ml-3">
                  <span>Log In</span>
                  <svg className="w-3 h-3 fill-current text-gray-100 shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
