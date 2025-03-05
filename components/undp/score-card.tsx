import { useState } from "react";
import { Fragment } from "react";
import { DropletIcon } from "lucide-react";
import { Switch } from '@headlessui/react'


function FilledIcon() {
  return (
    <DropletIcon
      strokeWidth="2"
      stroke="#016fb5" // set stroke color if you want it darker
      fill="#016fb5" // fill in the icon
      style={{ fill: '#016fb5', strokeWidth: 0 }} // removes the outline
      size={24}
    />
  );
}

function EmptyIcon() {
  return (
    <DropletIcon className="w-5 h-5 mr-1 text-gray-300" />
  );
}


export default function ScoreCard({ project }: any) {

  const [enabled, setEnabled] = useState(true)

  const mandatoryCriteria = [
    {
      score: project.replicability_scalability_score,
      question: "Replicable in different geographic locations",
    },
    {
      score: project.institutional_flexibility_score,
      question: "Flexible to different institutional settings",
    },
    {
      score: project.location_scalability_score,
      question: "Scalable within the same location",
    },
    {
      score: project.repeatability_score,
      question: "Repeatable without additional start-up costs after establishment in a location",
    },
  ];

  const mandatoryTotal={
    score: project.total_mandatory_criteria,
    question: "Total for Mandatory Criteria",
  }

  const optionalCriteria = [
    {
      score: project.poverty_reduction_impact_score,
      question: "Contributes to the reduction of poverty for the surrounding community",
    },
    {
      score: project.livelihoods_creation_score,
      question: "Supports creation of livelihoods",
    },
    {
      score: project.gender_mainstreaming_score,
      question: "Supports gender mainstreaming to include positive impacts to women and girls",
    },
    {
      score: project.water_management_score,
      question: "Potentially transformational in terms of improved water management",
    },
    {
      score: project.water_quality_ecosystems_score,
      question: "Addresses water for nature, such as water quality and ecosystems",
    },
    {
      score: project.water_resilience_score,
      question: "Addresses water for resilience, such as climate change impacts",
    },
    {
      score: project.peace_security_score,
      question: "Addresses water for peace and security directly, or includes marginalized communities, indigenous people or benefit sharing",
    },
    {
      score: project.additional_funding_potential_score,
      question: "Attracts additional partners and support for funding",
    },
    {
      score: project.drought_resilience_score,
      question: "Responds to drought, or drought resilience",
    },
  ];

  const total = {
    score: project.total_all_criteria,
    question: "Total for All Criteria",
  }

  return (
    <section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="">
          <div className="max-w-3xl mx-auto">
            <h3 className="h3 mb-4">Score Card</h3>
            <p className="text-lg text-gray-600 mb-8">Scores out of 5 across UNDP's mandatory criteria (1 being the lowest; 5 being the highest)</p>
          </div>
          <div className="justify-end max-w-3xl mx-auto flex flex-row items-center ml-12">
            <span className="text-sm text-gray-500 mr-4">
              Show Only Mandatory Criteria
            </span>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-undp-blue focus:ring-offset-2 data-[checked]:bg-undp-blue"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
              />
            </Switch>
          </div>
          <div className="grid grid-cols-4 max-w-3xl mx-auto mt-8 gap-x-4">
            {mandatoryCriteria.map(
              (item, index) =>
                item.score && (
                  <Fragment key={index}>
                    <div className="flex items-center mb-8 col-span-3">
                      <span className="text-md font-bold">{item.question}</span>
                    </div>
                    <div className="flex items-center mb-8">
                      {item.score >= 1 ? <FilledIcon /> : <EmptyIcon />}
                      {item.score >= 2 ? <FilledIcon /> : <EmptyIcon />}
                      {item.score >= 3 ? <FilledIcon /> : <EmptyIcon />}
                      {item.score >= 4 ? <FilledIcon /> : <EmptyIcon />}
                      {item.score == 5 ? <FilledIcon /> : <EmptyIcon />}
                    </div>
                  </Fragment>
                )
            )}
          </div>
          {!enabled && 
            <div className="grid grid-cols-4 max-w-3xl mx-auto gap-x-4">
              {optionalCriteria.map(
                (item, index) =>
                  item.score && (
                    <Fragment key={index}>
                      <div className="flex items-center mb-8 col-span-3">
                        <span className="text-md font-bold">{item.question}</span>
                      </div>
                      <div className="flex items-center mb-8">
                        {item.score >= 1 ? <FilledIcon /> : <EmptyIcon />}
                        {item.score >= 2 ? <FilledIcon /> : <EmptyIcon />}
                        {item.score >= 3 ? <FilledIcon /> : <EmptyIcon />}
                        {item.score >= 4 ? <FilledIcon /> : <EmptyIcon />}
                        {item.score == 5 ? <FilledIcon /> : <EmptyIcon />}
                      </div>
                    </Fragment>
                  )
              )}
            </div>
          }
          <div className="grid grid-cols-4 max-w-3xl mx-auto mt-4">
            {enabled 
              ? 
              <>
                <div className="flex items-center mb-8 col-span-3">
                  <span className="text-xl font-bold">{mandatoryTotal.question}</span>
                </div>
                <div className="flex justify-center text-end mb-8">
                  <span className="text-xl font-bold">{mandatoryTotal.score} / 20</span>
                </div>
              </>
              :
              <>
                <div className="flex items-center mb-8 col-span-3">
                  <span className="text-xl font-bold">{total.question}</span>
                </div>
                <div className="flex justify-center mb-8">
                  <span className="text-xl font-bold">{total.score} / 65</span>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </section>
  );
}
