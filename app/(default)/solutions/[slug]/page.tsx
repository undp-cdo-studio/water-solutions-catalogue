"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAtom } from "jotai";
import { createClient } from "@/lib/supabase/client";
import { detailTabAtom, projectIdAtom } from "@/lib/store";
import { DetailTabs } from "@/components/tabs";
import { FullPageLoader } from "@/components/loader";
import { ChevronLeft } from "lucide-react";
import Intro from "../../../../components/undp/intro";
import Content from "../../../../components/undp/lessons-learned";
import Summary from "../../../../components/undp/summary";
import Support from "@/components/support";
import ScoreCard from "@/components/undp/score-card";
import Embed from "@/components/embed";
import Link from "next/link";

export default function Detail() {

  const params = useParams()
  const supabase = createClient()

  const [detailTab, setDetailTab] = useAtom(detailTabAtom);
  const [selectedProjectId, setSelectedProjectId] = useAtom(projectIdAtom);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from("solutions")
      .select("*")
      .eq("id", params?.slug)
      .single();
    
    // const { data:projectData , error:projectError} = await supabase
    //   .from("data")
    //   .select("*")
    //   .eq("atlas_award_id", data.atlas_award_id)
    //   .single();

    setSelectedProject(data);
    setLoading(false);
  };

  useEffect(() => {
    loading && fetchProject()
  }, [selectedProjectId]);

  return (
    <>
      {loading ? <FullPageLoader /> : selectedProject && (
        <>
          <Intro
            title={selectedProject.best_practice_title ? selectedProject.best_practice_title : selectedProject.project_name}
            description={selectedProject.background}
            project={selectedProject}
          />
          <DetailTabs />
          {detailTab == "SUMMARY" && <Summary project={selectedProject} /> }
          {detailTab == "SCORE CARD" && <ScoreCard project={selectedProject} /> }
          {detailTab == "LESSONS LEARNED" && <Content lessonsLearned={selectedProject.best_practices_analysis} /> }
          {detailTab == "DETAILS & DOCUMENTS"  && selectedProject && selectedProject.atlas_award_id && <Embed src={"https://open.undp.org/projects/"+selectedProject.atlas_award_id} title={selectedProject.best_practice_title} />}
          {/* {detailTab == "DETAILS & DOCUMENTS" && <Documents documents={selectedProject.documents ? selectedProject.documents : []} />} */}
          {detailTab == "RECOMMENDATIONS" && <Content lessonsLearned={selectedProject.best_practices_analysis} /> }
          <div className="flex justify-center mt-8">
            <Link
              href={"/"}
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-undp-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-undp-red"
            >
              <ChevronLeft aria-hidden="true" className="-ml-0.5 h-5 w-5" />
              Back
            </Link>
          </div>
          <Support />
        </>
      )}
    </>
  );
}
