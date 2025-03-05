"use client";

import { useState } from "react";
import Article from "./undp/article";
import SuggestedQuestions from "./ui/pills";
import { useAtom, useAtomValue } from "jotai";
import { storedFreeTextAtom } from "@/lib/store";
import { RotateCcw } from "lucide-react";

export default function FreeText() {
  const [freeText, setFreeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useAtom(storedFreeTextAtom);

  const submit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const response = await fetch('/api/search', {
      const response = await fetch('/api/search-large', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query:freeText }),
      });
      const data = await response.json();
      setProjects(data.results);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Contact section */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pb-12 md:pb-20">
            {projects && projects.length > 0 ? (
              <>
              <h3 className="text-lg font-semibold mb-8 grid place-items-center">Our top 6 most relevant best practices are:</h3>
              <div className="grid gap-12 lg:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">
                {projects.map((project: any, index: any) => (
                  <Article
                    key={project.project_id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
              <div className="mt-12 w-full grid place-items-center">
                <button
                  onClick={() => setProjects([])}
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md py-2 text-sm font-semibold text-undp-red hover:text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  <RotateCcw aria-hidden="true" className="-ml-0.5 size-4" />
                  Start new search
                </button>
              </div>
              </>
            ) : (
              <>
                <div className="max-w-3xl mx-auto text-center pb-4 ">
                  <h1 className="h4">
                    What lessons learned are you focusing on?
                  </h1>
                  {/* <h1 className="h4">What is your water-related need?</h1> */}
                </div>
                <div className="pb-8">
                  <SuggestedQuestions onSelect={setFreeText} />
                </div>
                <div className="max-w-xl mx-auto">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      {/* <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="message">What is your water-related need?</label> */}
                      <textarea
                        id="message"
                        value={freeText}
                        rows={4}
                        onChange={(e) => setFreeText(e.target.value)}
                        className="form-textarea w-full text-gray-800"
                        placeholder="Write your message"
                      ></textarea>
                    </div>
                  </div>
                  <div className=" -mx-3 mt-4 grid place-items-center">
                    <div className="px-3">
                      <button
                        disabled={loading}
                        onClick={submit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            submit(e);
                          }
                        }}
                        className={`${loading ? "bg-gray-400 animate-pulse" : "bg-undp-blue hover:bg-sky-900"} btn rounded-none text-white  w-full`}
                      >
                        {loading ? "Searching..." : "Search"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
