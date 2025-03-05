"use client"

import Image from "next/image";
import Breadcrumbs from "@/components/breadcrumbs";
import { downloadPdf } from "@/components/pdfs/output";
import { DownloadIcon } from "lucide-react";

export default function AboutIntro({
  title,
  description,
  project = null,
  downloadable = true,
}: any) {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 ">
          <Breadcrumbs currentPage={title} />

          {/* Section header */}
          <div className="pt-12 max-w-6xl mx-auto text-start pb-12 md:pb-16">
            <h1 className="h1 mb-4">{title}</h1>
            <p className="text-xl text-gray-600">{description}</p>
          </div>

          <figure className="flex justify-center items-start">
            <Image
              alt="Hero"
              className="w-full h-auto opacity-90"
              height="400"
              src={`/solutions/${project.original_id}.jpg`}
              style={{
                aspectRatio: "768/400",
                objectFit: "cover",
              }}
              width="768"
            />
          </figure>

          {downloadable && (
            <a 
              onClick={() =>
                downloadPdf({
                  id: project.id,
                  name: project.best_practice_title ? project.best_practice_title : '',
                  description: project.atlas_award_id ? project.atlas_award_id : '',
                  category: project.institutions_governance ? project.institutions_governance : project.data_information_management,
                  summary: project.solution_summary ? project.solution_summary : '',
                  contact: project.contacts ? project.contacts : '',
                  budget: project.estimated_budget ? project.estimated_budget : '',
                  fundingCenters: "",
                  countryImplemented: project.implementing_countries ? project.implementing_countries : "",
                  potentialFundingSource: project.potential_funders ? project.potential_funders : "",
                  background: project.background ? project.background : "",
                  challenges: project.challenges ? project.challenges : "",
                  // lessonsLearned: project.key_lessons_learned ? project.key_lessons_learned : "",
                  lessonsLearned: project.best_practices_analysis ? JSON.parse(project.best_practices_analysis) : "",
                  replicabilityScalabilityScore: project.replicability_scalability_score ? project.replicability_scalability_score : "",
                  institutionalScore: project.institutional_flexibility_score ? project.institutional_flexibility_score : "",
                  locationScore: project.location_scalability_score ? project.location_scalability_score : "",
                  repeatableScore: project.repeatability_score ? project.repeatability_score : "",
                  mandatoryScore: project.total_mandatory_criteria ? project.total_mandatory_criteria : "",
                  povertyScore: project.poverty_reduction_impact_score ? project.poverty_reduction_impact_score : "",
                  livelihoodsScore: project.livelihoods_creation_score ? project.livelihoods_creation_score : "",
                  genderScore: project.gender_mainstreaming_score ? project.gender_mainstreaming_score : "",
                  waterManagementScore: project.water_management_score ? project.water_management_score : "",
                  waterQualityScore: project.water_quality_ecosystems_score ? project.water_quality_ecosystems_score : "",
                  waterResilienceScore: project.water_resilience_score ? project.water_resilience_score : "",
                  peaceScore: project.peace_scurity_score ? project.peace_scurity_score : "",
                  fundingPotentialScore: project.additional_funding_potential_score ? project.additional_funding_potential_score : "",
                  droughtResilienceScore: project.drought_resilience_score ? project.drought_resilience_score : "",
                  totalScore: project.total_all_criteria ? project.total_all_criteria : "",
                  sdgsAddressed: project.sdgs_addressed ? project.sdgs_addressed : "",
                  conditionsReplicability: project.conditions_for_replicability ? project.conditions_for_replicability : "",
                  expertiseRequired: project.human_resources ? project.human_resources : ""
                })
              }
              className="hover:opacity-80 flex flex-align justify-center hover:cursor-pointer hover:text-gray-700 items-center mt-10 font-semibold">
              DOWNLOAD AS PDF
              <DownloadIcon className="ml-2 text-undp-red hover:text-red-500"/>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
