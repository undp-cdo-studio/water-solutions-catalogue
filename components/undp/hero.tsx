import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { customizationAtom, pageAtom } from "@/lib/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Banner from "../banner";

export default function Hero({
  title = "WATER SOLUTIONS CATALOGUE",
  body = `
    Unlock a world of water solutions. Our AI-backed catalogue of global best practices enables you to co-design for fresh water empowerment and sustainability  – leaving no one behind.
  `,
}) {
  const router = useRouter();
  const setPage = useSetAtom(pageAtom);
  const [customization, setCustomization] = useAtom(customizationAtom);

  return (
    <div className="bg-white">
      <div className="relative">
        <Image
          alt="Hero"
          className="w-full h-auto opacity-90"
          height="400"
          src="/images/issues/floods/3.jpg"
          style={{
            aspectRatio: "768/400",
            objectFit: "cover",
          }}
          width="768"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="pt-20 md:pt-40 absolute inset-0 flex flex-col w-3/4 mx-auto p-4">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="hidden md:block mt-4 text-white max-w-2xl font-bold">
            {body}
          </p>
          <div className="mt-4 md:mt-12 gap gap-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    onClick={() => {
                      const element = document.querySelector('body');
                      if (element) {
                        const yOffset = window.innerHeight; // Half the height of the viewport
                        const y = element.getBoundingClientRect().top + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className="hidden md:block bg-undp-red hover:bg-red-800 text-white py-3 px-4 rounded-md font-bold mr-2"
                  >
                    Solutions Overview
                  </a>
                </TooltipTrigger>
                  <TooltipContent className="bg-gray-100">
                    <p className="text-bold text-undp-red">View our full list of solutions</p>
                  </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    onClick={() =>
                      customization.issues.length > 0
                        ? setCustomization({
                          issues: [],
                          geographic: [],
                          budget: [],
                          special: [],
                        })
                        : (setPage(1), router.push("/customize"))
                    }
                    className="block bg-undp-red hover:bg-red-800 text-white py-3 px-4 rounded-md font-bold"
                  >
                    {customization.issues.length > 0 ? "Remove Customization" : "Customize Solutions"}
                  </a>
                </TooltipTrigger>
                  <TooltipContent className="bg-gray-100">
                    <p className="text-bold text-undp-red">Add or remove custom filters to refine your search results</p>
                  </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
