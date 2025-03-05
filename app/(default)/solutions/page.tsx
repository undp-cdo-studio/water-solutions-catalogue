"use client";

import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import {
  searchResultsAtom,
  searchTabAtom,
  pageAtom,
  filterAtom,
  customizationAtom,
  regionAtom,
} from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { EmbeddedLoader } from "@/components/loader";
import { filters } from "@/lib/constants";
import { pageLimit } from "@/lib/constants";
import Hero from "@/components/undp/hero";
import Content from "@/components/content";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import Map from "@/components/map";
import FreeText from "@/components/free-text";
import Filters from "@/components/filters";
import Pills from "@/components/selected-pills";
import Empty from "@/components/ui/empty";
import { applyProjectFilter } from "@/lib/helpers/filter";

export default function Search() {
  const supabase = createClient();

  const currentTab = useAtomValue(searchTabAtom);
  const searchResults = useAtomValue(searchResultsAtom);
  const page = useAtomValue(pageAtom);
  const selectedRegion = useAtomValue(regionAtom);
  const filterState = useAtomValue(filterAtom);
  const customization = useAtomValue(customizationAtom);

  const [totalProjects, setTotalProjects] = useState<any | null>(0);
  const [projects, setProjects] = useState<any | null>(null);
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    const data = await applyProjectFilter(supabase, customization, filterState);
    // const data = await filterProjects();
    const filtered = data?.filter((d: any) =>
      currentTab == "SEARCH BY REGION" && selectedRegion
        ? d.regions &&
          d.regions.includes(selectedRegion)
        : d,
    );

    const startIndex = (page - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;
    const paginatedResults = filtered?.slice(startIndex, endIndex);
  
    setTotalProjects(filtered?.length);
    setProjects(paginatedResults);
    setLoading(false)
  };


  useEffect(() => {
    fetchProjects();
  }, [page, selectedRegion, filterState, customization]);

  return (
    <div className="bg-white md:mt-20">
      <section className="container mx-auto my-8 p-4">
        <div className="grid place-items-center">
          <h2 className="text-4xl font-bold mb-4">Solutions Overview</h2>
        </div>
        <Tabs />
        {currentTab == "SEARCH BY REGION" && <Map />}
        {currentTab == "SEARCH BY FREE TEXT" && !searchResults && <FreeText />}
        {currentTab != "SEARCH BY FREE TEXT" && <Pills/>}
        {currentTab != "SEARCH BY FREE TEXT" && !searchResults && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Filters filters={filters} />
              <div className="col-span-1 lg:col-span-3">
                { projects && projects.length > 0 && !loading &&  <Content projects={projects} /> }
                { projects && projects.length == 0 && !loading &&  <Empty /> }
                { loading && <EmbeddedLoader /> }
              </div>
            </div>
            {projects && projects.length > 0 && (
              <Pagination totalItems={totalProjects} itemsPerPage={pageLimit} />
            )}
          </>
        )}
      </section>
    </div>
  );
}
