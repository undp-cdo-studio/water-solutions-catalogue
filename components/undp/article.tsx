"use client";

import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { detailTabAtom, projectIdAtom } from "@/lib/store";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { truncateString, capitaliseString } from "@/lib/utils";
import Image from "next/image";

export const Article = ({ project, index }: any) => {
  const router = useRouter();
  const setSelectedProjectId = useSetAtom(projectIdAtom);
  const setDetailTab = useSetAtom(detailTabAtom);

  const select = () => {
    setSelectedProjectId(project.id);
    setDetailTab("SUMMARY")
    router.push(`/solutions/${project.id}`);
  };

  return (
    <article
      onClick={select}
      className="flex flex-col h-full"
      // data-aos="zoom-y-out"
      // data-aos-delay={index * 150}
    >
      <header>
        <a className="hover:cursor-pointer block mb-6">
          <figure className="relative h-0 pb-9/16 overflow-hidden translate-z-0 rounded">
            <Image
              className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:-translate-y-1 transition duration-700 ease-out"
              src={`/solutions/${project.original_id}.jpg`}
              width={352}
              height={198}
              alt="Project Picture"
            />
          </figure>
        </a>
        <div className="mb-3">
          <ul className="flex flex-wrap text-xs font-medium -m-1">
            <li className="m-1" key={index}>
              {project.water_focused && (
                <a
                  className={`hover:cursor-pointer inline-flex text-center text-undp-blue py-1 px-3 rounded-full ${project.water_focused ? "bg-sky-200" : "bg-white"} shadow-sm transition duration-150 ease-in-out`}
                >
                  {project.water_focused ? "WATER FOCUSED" : "WATER RELATED"}
                </a>
              )}
            </li>
          </ul>
        </div>
        <h3 className="text-xl font-bold leading-snug tracking-tight mb-2">
          <a className="hover:cursor-pointer hover:underline">
            {truncateString(project.best_practice_title, 50)}
          </a>
        </h3>
      </header>
      <p className="text-gray-600 grow">
        {project.best_practice_title ? truncateString(project.project_name, 50) : ""}
      </p>
      <footer className="text-sm font-bold flex items-center mt-4">
        <a className="hover:cursor-pointer hover:underline">READ MORE</a>
        <ChevronRightIcon
          className="ml-1 text-undp-red"
          height={36}
          width={36}
        />
      </footer>
    </article>
  );
};

export default Article;
