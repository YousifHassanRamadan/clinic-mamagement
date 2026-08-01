import React from "react";
import Image from "next/image";
import DoctorImage from "@/assets/Serene-Mind-Clinic/doctor.jpg";

const DoctorImg = () => {
  return (
    <div className="relative h-[450px] w-[350px]  rounded-3xl">
      <Image
        src={DoctorImage}
        alt="Doctor"
        className="object-cover rounded-3xl"
      />
    </div>
  );
};

export default DoctorImg;
