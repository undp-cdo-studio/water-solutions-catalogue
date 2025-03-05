import Link from "next/link";
import Image from "next/image";

export default function Logo({ colour = "blue", header=true }) {
  return (
    <Link href="/" className="flex-align items-center flex mt-3" aria-label="UNDP">
      <Image
        src={`${colour == "blue" ? "/assets/logo.svg" : "/assets/logo-white.svg"}`}
        alt="UNDP Logo"
        height={54}
        width={54}
      />
      <div className="ml-6">
        {header && 
          <div className="">
            <span className={`${colour == "blue" ? "text-gray-700" : "text-white"} text-xs underline underline-offset-2`}>Global</span>
          </div>
        }
        <span
          className={`${colour == "blue" ? "" : "text-white"} ${header ? "text-lg" : "text-2xl"}`}
        >
          {header ? "Water Solutions Catalogue" : "United Nations Development Programme"}
        </span>
      </div>
    </Link>
  );
}
