"use client";

import { Button } from "@/components/ui/button";
import { geographicOptions, specialSituations } from "@/lib/constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { customizationAtom, filterAtom, pageAtom } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Category from "@/components/undp/category";

export default function Customize({checkResults}:any) {
  const router = useRouter();
  const [customization, setCustomization] = useAtom(customizationAtom)
  const setPage = useSetAtom(pageAtom);

  const [state, setState] = useState<string[]>([]);
  const [error, setError] = useState(false)


  const submit = async () => {
    setError(false)
    // const data = await checkResults({additionalArray: state.includes("none") ? [] : state})
    // if (data.length == 0){
    //   setError(true)
    //   return
    // }
    //@ts-ignore
    state && state.length > 0 && setCustomization({...customization, special: state.includes("none") ? [] : state });
    setPage(4);
  };

  const updateState = (values: string[]) => {
    if (state.includes(values[0])) {
      const newState = state.filter((item:any) => !values.includes(item));
      setState(newState);
    } else {
      setState([...state, ...values]);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Customize your solutions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please describe the special conditions of the area that is facing the issue (if any)
        </p>
      </div>
      <div className="space-y-4 pt-8 ">
      <fieldset>
          <div className="grid grid-cols-3 gap-2">
            {specialSituations.map((option) => (
              <div key={option.name}>
                <Category 
                  image={option.image} 
                  name={option.name}
                  items={option.items} 
                  select={updateState} 
                  state={state}
                  store={customization.special}
                />
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-16 flex">
        <Button
          onClick={() => router.push("/")}
          className=" bg-undp-blue flex justify-end rounded-none hover:bg-sky-800"
        >
          SKIP TO END
        </Button>
        <Button
          onClick={() => setPage(2)}
          className={`ml-40 lg:ml-60 xl:ml-80 bg-undp-blue hover:bg-sky-800 rounded-none border-r-2 border-white`}
        >
          BACK
        </Button>
        <Button
          onClick={submit}
          disabled={state.length === 0}
          className={`${state.length === 0 ? "bg-gray-300":"bg-undp-blue hover:bg-sky-800"} rounded-none `}
        >
          NEXT
        </Button>
      </div>
      <p className={`${!error && "invisible"} text-undp-red font-sm mt-4`}>The selected options provides no results. Please select different options.</p>
    </div>
  );
}
