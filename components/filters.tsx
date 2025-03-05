"use client";

import { useAtom, useSetAtom } from "jotai";
import { customizationAtom, filterAtom } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { addDollarSigns, capitalizeFirstLetters } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { waterUserCategories } from "@/lib/constants";

const FilterAccordion = ({
  title,
  description,
  filterId,
  options,
  object=false,
}: {
  title: string;
  description:string;
  filterId: string;
  options: any;
  object?: Boolean
}) => {

  const [filters, setFilters] = useAtom(filterAtom);

  const updateState = (value: string, filterId: string) => {
    const newFilters = { ...filters };
    const filterValues = newFilters[filterId] || [];

    if (filterValues.includes(value)) {
      newFilters[filterId] = filterValues.filter(
        (item: string) => item !== value
      );
    } else {
      newFilters[filterId] = [...filterValues, value];
    }

    setFilters(newFilters);
  };
  
  return (
    // <TooltipProvider>
    //   <Tooltip>
    //     <TooltipTrigger>
          <Accordion collapsible type="single">
            <AccordionItem value={filterId}>
              <AccordionTrigger className="text-base">{title}</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {object ? 
                    <>
                      <Label className="flex items-center gap-2 my-1 font-normal leading-relaxed">
                        <Checkbox 
                          checked={filters["category"]?.includes("Water for Nature") ?? false}
                          onCheckedChange={() => updateState("Water for Nature", "category")}
                        />
                        Water Quality {"\n"}
                      </Label>
                      <Label className="flex items-center gap-2 my-1 font-normal leading-relaxed">
                        <Checkbox 
                          checked={filters["category"]?.includes("Water for Resilience") ?? false}
                          onCheckedChange={() => updateState("Water for Peace and Security", "category")}
                        />
                        Water Quantity {"\n"}
                      </Label>
                      <Label className="flex items-center gap-2 my-1 font-normal leading-relaxed">
                        <Checkbox 
                          checked={filters["category"]?.includes("Water for Resilience") ?? false}
                          onCheckedChange={() => updateState("Water for Peace and Security", "category")}
                        />
                        Water Security {"\n"}
                      </Label>
                    </>
                    :
                  options.map((option:any, index:string) => (
                    <Label
                      key={filterId + "-" + index}
                      className="flex items-center gap-2 my-1 font-normal leading-relaxed"
                    >
                      <Checkbox 
                        checked={filters[filterId]?.includes(option) ?? false}
                        onCheckedChange={() => updateState(option, filterId)}
                        id={`${filterId}-option${index + 1}`} 
                      />
                      {filterId=="budget" 
                        ? capitalizeFirstLetters(addDollarSigns(option)) 
                        : filterId=="challenges" && option=="biodiversity"
                          ? capitalizeFirstLetters(option)+" Loss" 
                          : filterId=="solutions" && option=="nature-based solution" 
                            ? capitalizeFirstLetters(option)+"s"
                            : capitalizeFirstLetters(option)
                      }
                      {"\n"}
                    </Label>
                  ))
                }
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
    //     </TooltipTrigger>
    //       <TooltipContent className="bg-gray-100">
    //         <p className="text-bold text-undp-red">{description}</p>
    //       </TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
  );
};

export default function Filters({ filters }: any) {

  const setFilters = useSetAtom(filterAtom)
  const setCustomization = useSetAtom(customizationAtom)

  const resetFilters = () => {
    setFilters({
      issues:[],
      category: [],
      geographic: [],
      sdgs: [],
      sdgTargets: [],
      characteristics: [],
      expertise:[],
      budget: [],
      waterFocused:[]
    })
  }

  const resetCustomization = () => {
    setCustomization({
      issues: [],
      geographic: [],
      budget: [],
      special: [],
    })
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-align items-center">
          <button
            onClick={resetFilters}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md py-2 text-sm font-semibold text-undp-red hover:text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            <RotateCcw aria-hidden="true" className="-ml-0.5 size-4" />
            Reset filters
          </button>
          {/* <button
            onClick={resetCustomization}
            type="button"
            className="ml-8 inline-flex items-center gap-x-1.5 rounded-md py-2 text-sm font-semibold text-undp-red hover:text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            <RotateCcw aria-hidden="true" className="-ml-0.5 size-4" />
            Reset customization
          </button> */}
        </div>
        <div>
          <button
            onClick={resetCustomization}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md py-2 text-sm font-semibold text-undp-red hover:text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            <RotateCcw aria-hidden="true" className="-ml-0.5 size-4" />
            Reset customization
          </button>
        </div>
        <FilterAccordion
          title="Water Category"
          description="Filter by the categories of Water projects as defined by the UNDP Water & Oceans Team"
          filterId="category"
          options={waterUserCategories}
          object={true}
        />
        {filters.map((filter: any, index: any) => (
          <FilterAccordion
            key={index}
            title={filter.title}
            description={filter.description}
            filterId={filter.filterId}
            options={filter.options}
          />
        ))}
      </div>
    </div>
  );
}
