import { doctor } from "@/constants/home/home";
import Image from "next/image";

const DoctorImage = () => {
  return (
    <div className="relative h-[300px] w-[400px] overflow-hidden rounded-3xl lg:h-[520px]">
      <Image
        src={doctor.image}
        alt={doctor.name}
        fill
        priority
        className="object-cover"
      />
    </div>
  );
};

export default DoctorImage;
