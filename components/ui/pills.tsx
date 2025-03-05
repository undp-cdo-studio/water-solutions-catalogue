import { capitalizeFirstLetters } from "@/lib/utils"

export default function SuggestedQuestions({onSelect}:any) {
  const suggestions=["Solutions for Pollution", "Best Practices for ensuring Water Quality", "Conflict Solutions in the Middle East","Best Practices for Drought Management in Arid Countries"]
  return (
    <div className="flex justify-center">
      <div className="flex justify-center mb-4 max-w-4xl flex-wrap">
        {suggestions?.map((item:string) => (
          <span onClick={() => onSelect(item)} key={item} className="hover:cursor-pointer m-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-undp-blue hover:bg-blue-300">
            {capitalizeFirstLetters(item)}
          </span>
        ))}
      </div>
    </div>
  )
}
