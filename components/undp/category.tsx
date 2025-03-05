"use client";

import { truncateString } from "@/lib/utils";
import Image from "next/image";

export const Category = ({ 
  image, 
  name, 
  items, 
  select, 
  state,
  store
}: any) => {
  return (
    <article
      onClick={() => select(items)}
      className="flex flex-col h-full mt-4"
    >
      <header>
        <a className="hover:cursor-pointer block mb-2">
          <figure className="relative h-0 pb-9/16 overflow-hidden translate-z-0 rounded">
            <Image
              className={`
                ${!state.includes(items[0]) && "opacity-50"} 
                absolute inset-0 w-full h-full object-cover transform scale-105 hover:-translate-y-1 transition duration-700 ease-out`
              }
              src={`${image ? image : "/assets/project.png"}`}
              width={352}
              height={198}
              alt="Project Picture"
            />
          </figure>
        </a>
      </header>
      <footer className="text-sm font-bold flex flex-align items-center">
        <h3 className="text-xl font-bold leading-snug tracking-tight mb-2">
          <a className={`${!state.includes(items[0]) && "opacity-50"} hover:cursor-pointer hover:underline`}>
            {truncateString(name, 50)}
          </a>
        </h3>
      </footer>
    </article>
  );
};

export default Category;
