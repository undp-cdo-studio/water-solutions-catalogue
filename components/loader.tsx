import React from 'react';
import Lottie from 'lottie-react';
import { Loader2 } from "lucide-react";
const WaterAnimation = "/anim/water.json"

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-undp-blue" />
        <p className="text-lg font-medium text-gray-800">Loading...</p>
      </div>
    </div>
  );
}

export const EmbeddedLoader = () => {
  return (
    <div className="grid place-items-center mt-40">
        <Loader2 className="h-12 w-12 animate-spin text-undp-blue" />
        <p className="text-lg font-medium text-gray-800">Loading...</p>
    </div>
  );
};


// export const WaterAnimationLoader = () => {
//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="w-24 h-24">
//         <Lottie 
//           animationData={WaterAnimation}
//           loop={true}
//           autoplay={true}
//         />
//       </div>
//     </div>
//   );
// };

