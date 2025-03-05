import Image from "next/image";

const SdgGrid = ({sdgs}:any) => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
      {Array.from({ length: 17 }, (_, i) => (
        <>
          {sdgs.includes(i + 1) &&
            <div key={i + 1} className="flex justify-center items-center pr-1 py-1">
              <Image
                src={`/sdgs/Goal_${i + 1}.svg`}
                alt={`SDG Goal ${i + 1}`}
                className="w-full h-full"
                width={60}
                height={60}
              />
            </div>
          }
        </>
      ))}
    </div>
  );
};

export default SdgGrid;