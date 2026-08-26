// components/feature/home/about-doctor/doctor-img/doctor-img.tsx

import React from "react";
import Image from "next/image";
import DoctorImage from "@/assets/Serene-Mind-Clinic/hero.jpg";

const DoctorImg = () => {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[350px] overflow-hidden rounded-3xl sm:h-[450px]">
      <Image
        src={DoctorImage}
        alt="Doctor"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 350px, 350px"
        className="rounded-3xl object-cover"
      />
    </div>
  );
};

export default DoctorImg;
