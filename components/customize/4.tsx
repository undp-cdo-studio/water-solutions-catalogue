"use client";

import { Button } from "@/components/ui/button";
import { budgetOptions, geographicOptions, issueOptions } from "@/lib/constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { customizationAtom, filterAtom, pageAtom } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { addDollarSigns, capitalizeFirstLetters } from "@/lib/utils";

export default function Customize({checkResults}:any) {
  const router = useRouter();
  const [customization, setCustomization] = useAtom(customizationAtom);
  const setPage = useSetAtom(pageAtom);

  const [state, setState] = useState<string[]>([]);
  const [error, setError] = useState(false)


  const submit = async () => {
    setError(false)
    // const data = await checkResults({additionalArray: state})
    // if (data.length == 0){
    //   setError(true)
    //   return
    // }
    state && state.length > 0 && setCustomization({...customization, budget:state });
    router.push("/")
    setPage(1)
  };

  const updateState = (value: string) => {
    state.includes(value) 
      ? setState(state.filter((item: string) => item !== value)) 
      : setState([...state, value])
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Customize your solutions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please describe the potential budget that can be allocated
        </p>
      </div>
      <div className="space-y-4 pt-8 ">
      <fieldset>
          <div className="grid grid-cols-2 gap-2">
            {budgetOptions.map((option) => (
              <div key={option} className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id={option}
                    name={option}
                    type="checkbox"
                    //@ts-ignore
                    checked={state.includes(option)}
                    // onChange={() => updateState({ [option]: state[option] ? !state[option] : true })}
                    onChange={() => updateState(option)}
                    aria-describedby={`${option}-description`}
                    className="h-4 w-4 rounded border-gray-300 text-undp-blue focus:ring-undp-blue"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor={option} className="font-medium text-gray-900">
                    {addDollarSigns(option)}
                  </label>{" "}
                </div>
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
          onClick={() => setPage(3)}
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
