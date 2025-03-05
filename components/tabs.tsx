"use client";

import { useAtom } from "jotai";
import {
  detailTabAtom,
  mapAtom,
  searchTabAtom,
} from "@/lib/store";
import { detailTabs, searchTabs } from "@/lib/constants";
import { classNames } from "@/lib/utils";

export function DetailTabs() {
  const [currentTab, setCurrentTab] = useAtom(detailTabAtom);
  const [map, setMap] = useAtom(mapAtom);

  return (
    <div className="pb-20 flex justify-center items-center pt-8">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-undp-red focus:ring-undp-red"
          defaultValue={"SUMMARY"}
        >
          {detailTabs.map((tab: string) => (
            <option onClick={() => setCurrentTab(tab)} key={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block min-w-xl max-w-6xl">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {detailTabs.map((tab: string) => (
              <a
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={classNames(
                  tab == currentTab
                    ? "border-undp-red text-black"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  `w-40 border-b-2 py-4 px-1 text-center text-sm font-medium hover:cursor-pointer `,
                )}
              >
                {tab}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function SearchTabs() {
  const [currentTab, setCurrentTab] = useAtom(searchTabAtom);
  const [map, setMap] = useAtom(mapAtom);

  return (
    <div className="pb-20 flex justify-center items-center pt-8 ">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-undp-red focus:ring-undp-red"
          // defaultValue={"SEARCH BY REGION"}
        >
          {searchTabs.map((tab: string) => (
            <option
              onSelect={() => (setMap(null), setCurrentTab(tab))}
              key={tab}
            >
              {tab}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block min-w-xl max-w-3xl">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {searchTabs.map((tab: string) => (
              <a
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={classNames(
                  tab == currentTab
                    ? "border-undp-red text-black"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium hover:cursor-pointer ",
                )}
              >
                {tab}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
