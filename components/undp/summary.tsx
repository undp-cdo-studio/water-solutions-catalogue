"use client"

import { addDollarSigns, capitaliseString, capitalizeFirstLetters, padWithZeros } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { detailTabAtom } from "@/lib/store";
import ScoreCard from "./score-card"
import LessonsLearned from "./lessons-learned"
import Link from "next/link";
import SdgGrid from "../ui/sdgs";
import { useSetAtom } from "jotai";

export default function Summary({ project }: any) {
  const setDetailTab = useSetAtom(detailTabAtom)
  return (
    <section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="">

          {/* Header  */}
          <div className="max-w-3xl mx-auto">
            <h3 className="h3 mb-4">Summary</h3>
            {/* Changed from Solution Summary -> Background -> Solution Summary. Changes back and forth 14/11/2024 */}
            <p className="text-lg text-gray-600 mb-8">{project.solution_summary}</p>
          </div>

          <ScoreCard project={project}/>

          {/* Summary */}
          <div className="grid grid-cols-5 max-w-3xl mx-auto mt-8">
            <h3 className="h3 mb-8 col-span-5">Information</h3>
            {(project.institutions_governance || project.data_information_management) && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">UNDP WATER CATEGORY</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">{project.institutions_governance ? project.institutions_governance : project.data_information_management}</a>
                </div>
              </>
            )}

            {project.challenges && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">CHALLENGES</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">{capitalizeFirstLetters(project.challenges.replaceAll(";",", "))}</a>
                </div>
              </>
            )}
            {project.sdgs_addressed && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">SDGS ADDRESSED</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  {/* <a className="font-regular">{capitalizeFirstLetters(project.sdgs_addressed.replaceAll(";",", "))}</a> */}
                  <SdgGrid sdgs={project.sdgs_addressed}/>
                </div>
              </>
            )}
            {project.conditions_for_replicability && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">CONDITIONS FOR REPLICABILITY</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">{capitalizeFirstLetters(project.conditions_for_replicability.replaceAll(";",", "))}</a>
                </div>
              </>
            )}
            {project.implementing_countries && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">IMPLEMENTING COUNTRIES</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">{capitalizeFirstLetters(project.implementing_countries.replaceAll(";",", "))}</a>
                </div>
              </>
            )}
            {project.region && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">REGION</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">{project.region}</a>
                </div>
              </>
            )}
            {project.contacts && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">CONTACTS</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">{project.contacts}</a>
                </div>
              </>
            )}
            {project.estimated_budget && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">ESTIMATED BUDGET</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">
                    {addDollarSigns(capitaliseString(project.estimated_budget))}
                  </a>
                </div>
              </>
            )}
            {project.human_resources && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">REQUIRED EXPERTISE</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">
                    {capitalizeFirstLetters(project.human_resources)}
                  </a>
                </div>
              </>
            )}
            <div className="col-span-5">
              <LessonsLearned lessonsLearned={project.best_practices_analysis}/>
            </div>
            {/* {project.background && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">BACKGROUND</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <a className="font-regular">
                    {project.background}
                  </a>
                </div>
              </>
            )} */}
            {project.atlas_award_id && (
              <>
                <div className="col-span-2 flex flex-align items-center mb-8">
                  <a className="text-md font-bold">ADDITIONAL INFORMATION</a>
                </div>
                <div className="col-span-3 flex flex-align items-center mb-8">
                  <button
                    // href={
                    //   project.atlas_award_id ? "https://open.undp.org/projects/" + padWithZeros(project.atlas_award_id) : "https://open.undp.org/projects/"
                    // }
                    onClick={() => setDetailTab("DETAILS & DOCUMENTS")}
                    // target="_blank"
                    className="font-bold text-undp-blue hover:text-blue-900"
                  >
                    Details & Documents
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
