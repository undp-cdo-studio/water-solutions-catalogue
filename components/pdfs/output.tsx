import React from 'react';
import Template from "./templates/v1"
import { pdf } from "@react-pdf/renderer";

export async function downloadPdf({
  id,
  name,
  description,
  category,
  summary,
  contact,
  budget,
  fundingCenters,
  countryImplemented,
  potentialFundingSource,
  lessonsLearned,
  background,
  challenges,
  replicabilityScalabilityScore,
  institutionalScore,
  locationScore,
  repeatableScore,
  mandatoryScore,
  povertyScore,
  livelihoodsScore,
  genderScore,
  waterManagementScore,
  waterQualityScore,
  waterResilienceScore,
  peaceScore,
  fundingPotentialScore,
  droughtResilienceScore,
  totalScore,
  sdgsAddressed,
  conditionsReplicability,
  expertiseRequired
}: {
  id:any
  name:string,
  description:string,
  category:string,
  summary:string,
  contact:string,
  budget:string,
  fundingCenters:string,
  countryImplemented:string,
  potentialFundingSource:string,
  lessonsLearned:string,
  background:string,
  challenges:string,
  replicabilityScalabilityScore:any,
  institutionalScore:any,
  locationScore:any,
  repeatableScore:any,
  mandatoryScore:any,
  povertyScore:any,
  livelihoodsScore:any,
  genderScore:any,
  waterManagementScore:any,
  waterQualityScore:any,
  waterResilienceScore:any,
  peaceScore:any,
  fundingPotentialScore:any,
  droughtResilienceScore:any,
  totalScore:any,
  sdgsAddressed:string,
  conditionsReplicability:string,
  expertiseRequired:string
}) {
  try {
    // Create a blob from the response
    const blob = await pdf(
      <Template
        id={id}
        name={name}
        description={description}
        category={category}
        summary={summary}
        contact={contact}
        budget={budget}
        fundingCenters={fundingCenters}
        countryImplemented={countryImplemented}
        potentialFundingSource={potentialFundingSource}
        lessonsLearned={lessonsLearned}
        background={background}
        challenges={challenges}
        replicabilityScalabilityScore={replicabilityScalabilityScore}
        institutionalScore={institutionalScore}
        locationScore={locationScore}
        repeatableScore={repeatableScore}
        mandatoryScore={mandatoryScore}
        povertyScore={povertyScore}
        livelihoodsScore={livelihoodsScore}
        genderScore={genderScore}
        waterManagementScore={waterManagementScore}
        waterQualityScore={waterQualityScore}
        waterResilienceScore={waterResilienceScore}
        peaceScore={peaceScore}
        fundingPotentialScore={fundingPotentialScore}
        droughtResilienceScore={droughtResilienceScore}
        totalScore={totalScore}
        sdgsAddressed={sdgsAddressed}
        conditionsReplicability={conditionsReplicability}
        expertiseRequired={expertiseRequired}
      />,
    ).toBlob(); // Convert your component to a PDF blob
    const url = URL.createObjectURL(blob); // Create a URL for the blob

    const link = document.createElement("a");
    link.href = url;
    link.download = `WSC-${name}.pdf`; // Specify the filename
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
  }
}
