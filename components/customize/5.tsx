"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { filterAtom, pageAtom } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Customize({checkResults}:any) {
  const router = useRouter();
  const [filterState, setFilterState] = useAtom(filterAtom);
  const setPage = useSetAtom(pageAtom);

  const [state, setState] = useState<any | null>({});

  const updateState = (propertyToUpdate: any) => {
    setState((prevState: any) => ({
      ...prevState,
      ...propertyToUpdate,
    }));
  };

  const submit = () => {
    setFilterState({
      ...filterState,
      name: state.name,
      email: state.email,
    });
    setPage(6);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Customize your solutions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please let us know your available timeline.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            value={state.name ? state.name : ""}
            onChange={(e) => updateState({ name: e.target.value })}
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={state.email ? state.email : ""}
            onChange={(e) => updateState({ email: e.target.value })}
            id="email"
            placeholder="m@example.com"
            required
            type="email"
          />
        </div>
      </div>
      <div className="mt-16 flex">
        <Button
          onClick={() => router.push("/")}
          className="ml-60 bg-undp-blue flex justify-end rounded-none hover:bg-sky-800"
        >
          SKIP TO END
        </Button>
        <Button
          onClick={() => setPage(4)}
          className={`bg-undp-blue hover:bg-sky-800 rounded-none border-r-2 border-white`}
        >
          BACK
        </Button>
        <Button
          onClick={submit}
          className="bg-undp-blue rounded-none hover:bg-sky-800"
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}
