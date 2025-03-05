"use client";

import { useSetAtom } from "jotai";
import { useState } from 'react'
import { mapAtom, pageAtom, regionAtom } from "@/lib/store";
import { ResponsiveGeoMap } from "@nivo/geo";
import { UNDP_REGIONS } from "@/lib/constants";
import worldCountries from "../lib/world_countries.json"; // Ensure correct path

export const Map = () => {
  const [selectedRegion, setSelectedRegion] = useState("");

  const setSelectedCountries = useSetAtom(mapAtom);
  const setSelectedRegionText = useSetAtom(regionAtom);
  const setPage = useSetAtom(pageAtom)

  const handleRegionSelect = (regionKey:any) => {
    setPage(1)
    const isSelected = regionKey === selectedRegion;
    setSelectedRegion(isSelected ? "" : regionKey);
    {/* @ts-ignore */}
    setSelectedRegionText(isSelected ? "" : UNDP_REGIONS[regionKey].region); {/* @ts-ignore */}
    setSelectedCountries(isSelected ? [] : UNDP_REGIONS[regionKey].countries);
  };

  const isCountryInSelectedRegion = (countryId:any) => {
    if (!selectedRegion) return false;
     {/* @ts-ignore */}
    return UNDP_REGIONS[selectedRegion].countries.includes(countryId);
  };

  const getFillColor = (feature:any) => {
    if (isCountryInSelectedRegion(feature.id)) {
      return "#64B5F6"; // Highlighted color for selected region
    }
    return "#eeeeee"; // Default color
  };

  const handleCountryClick = (countryId:string) => {
    setPage(1)
    for (const [regionKey, regionData] of Object.entries(UNDP_REGIONS)) {
      if (regionData.countries.includes(countryId)) {
        handleRegionSelect(regionKey);
        break;
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(UNDP_REGIONS).map(([key, region]) => (
          <button
            key={key}
            onClick={() => handleRegionSelect(key)}
            className={`px-3 py-1 font-semibold text-sm rounded-full transition-colors ${
              selectedRegion === key
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {region.region}
          </button>
        ))}
      </div>
      
      <div className="text-sm text-gray-600 grid place-items-center">
        <p className={`${!selectedRegion && "invisible"} font-medium`}>
          {/* @ts-ignore */}
          {selectedRegion ? UNDP_REGIONS[selectedRegion].name : "hidden"}
        </p>
        <p className="mt-1">
          {/* @ts-ignore */}
          {selectedRegion ? UNDP_REGIONS[selectedRegion].countries.length : 0} countries selected
        </p>
      </div>
      
      <div className="h-[400px] w-full pb-8 hover:cursor-pointer">
        <ResponsiveGeoMap
          features={worldCountries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          fillColor={getFillColor}
          borderColor="white"
          graticuleLineColor="#5749c5"
          onClick={(feature) => handleCountryClick(feature.id)}
          borderWidth={0.5}
          tooltip={({ feature }) => (
            <div className="bg-white px-2 py-1 rounded shadow">
              {feature.properties.name}
              {isCountryInSelectedRegion(feature.id) && (
                <span className="text-blue-500 ml-2">({selectedRegion})</span>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Map;