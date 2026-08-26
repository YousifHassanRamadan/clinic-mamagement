// components/feature/layout/header/logo/logo.tsx

import Image from "next/image";
import logo from "@/assets/logo.png";

const LogoSection = () => {
  return (
    <div className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
      <Image
        src={logo}
        alt="Dr. Yasmin Madeh Logo"
        width={50}
        height={50}
        className="h-10 w-10 shrink-0 rounded-4xl sm:h-12 sm:w-12"
      />

      <p className="truncate font-serif text-sm font-bold text-foreground sm:text-base md:text-lg">
        Dr. Yasmin Madeh
      </p>
    </div>
  );
};

export default LogoSection;
