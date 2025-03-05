import { customizationAtom, filterAtom } from "@/lib/store"
import { useAtomValue } from "jotai"
import { addDollarSigns, capitalizeFirstLetters } from "@/lib/utils"

export default function SelectedPills() {
  const filterState = useAtomValue(filterAtom)
  const customization = useAtomValue(customizationAtom)
  return (
    <div className="flex justify-center">
      <div className="flex justify-center mb-4 max-w-4xl flex-wrap">
        {customization.issues?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-undp-red">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-red-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Issue Customization: " + capitalizeFirstLetters(item)}
          </span>
        ))}
        {customization.geographic?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-undp-red">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-red-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Geographic Customization: " + capitalizeFirstLetters(item)}
          </span>
        ))}
        {customization.special?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-undp-red">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-red-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Special Conditions Customization: " +capitalizeFirstLetters(item)}
          </span>
        ))}
        {customization.budget?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-undp-red">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-red-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Budget Customization: "+capitalizeFirstLetters(addDollarSigns(item))}
          </span>
        ))}
        {filterState.category?.map((item:any, index:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-undp-blue">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-blue-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Water Category: "+capitalizeFirstLetters(item)}
          </span>
        ))}
        {filterState.issues?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-undp-blue">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-blue-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Issue: "+capitalizeFirstLetters(item)}
          </span>
        ))}
        {filterState.solutions?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-undp-blue">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-blue-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Solution: "+capitalizeFirstLetters(item)}
          </span>
        ))}
        {filterState.challenges?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-undp-blue">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-blue-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Challenge: "+capitalizeFirstLetters(item)}
          </span>
        ))}
        {filterState.geographic?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-undp-blue">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-blue-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Geography: "+capitalizeFirstLetters(item)}
          </span>
        ))}
        {filterState.budget?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-undp-blue">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-blue-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"Budget: "+capitalizeFirstLetters(addDollarSigns(item))}
          </span>
        ))}
        {filterState.sdgs?.map((item:any) => (
          <span key={item} className="m-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-undp-blue">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-blue-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {"SDGs Addressed: "+capitalizeFirstLetters(item)}
          </span>
        ))}
      </div>
    </div>
  )
}
