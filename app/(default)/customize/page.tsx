/** @see https://v0.dev/t/DjfYcepf4Oi **/

"use client";

import Page1 from "@/components/customize/1";
import Page2 from "@/components/customize/2";
import Page3 from "@/components/customize/3";
import Page4 from "@/components/customize/4";
import Page5 from "@/components/customize/5";
import Page6 from "@/components/customize/6";
import { useAtomValue } from "jotai";
import { customizationAtom, pageAtom } from "@/lib/store";

export default function Customize() {
  const page = useAtomValue(pageAtom);

  // const checkResults = async ({
  //   additionalArray=[]
  // }:{
  //   additionalArray?:string[]
  // }) => {
  //   let query = supabase.from('solutions').select('*')

  //   const applyMultiFilter = (column:any, values:any) => {
  //     if (values && values.length > 0) {
  //       query = query.or(
  //         values.map((value:any) => `${column}.ilike.%${value}%`).join(',')
  //       )
  //     }
  //   }
  //   query = query.filter('id', 'not.is', null)
  //   const arrayToCheck = [
  //     ...(customization.issues || []), 
  //     ...(customization.geographic || []),
  //     ...(customization.budget || []),
  //     ...(customization.special || []),
  //     ...additionalArray
  //   ]
  //   if (customization && customization.issues && customization.issues.length > 0) {
  //     applyMultiFilter('combined', arrayToCheck)
  //   }
  //   const { data, error } = await query
  //   return data
  // }

  const checkResults = () => {

  }
  
  return (
    <div className="pt-20 grid w-full min-h-[600px] lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          alt="Onboarding Illustration"
          className="h-full w-full object-cover"
          height="600"
          src="/assets/customize.png"
          style={{
            aspectRatio: "800/600",
            objectFit: "cover",
          }}
          width="800"
        />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        {page == 1 && <Page1 checkResults={checkResults}/>}
        {page == 2 && <Page2 checkResults={checkResults}/>}
        {page == 3 && <Page3 checkResults={checkResults}/>}
        {page == 4 && <Page4 checkResults={checkResults}/>}
        {page == 5 && <Page5 checkResults={checkResults}/>}
        {page == 6 && <Page6 checkResults={checkResults}/>}
      </div>
    </div>
  );
}
