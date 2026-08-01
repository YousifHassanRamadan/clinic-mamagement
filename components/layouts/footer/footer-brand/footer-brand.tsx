import logo from "@/assets/logo.png";
import Image from "next/image";

const FooterBrand = () => {
  return (
    <div className="block">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <p className="text-foreground  text-lg font-bol">Serene Mind Clinic</p>
      </div>

      <p className="mt-4 max-w-md leading-8 text-muted-foreground">
        Evidence-based psychology, delivered with warmth. A single-practitioner
        psychology clinic with a patient portal for appointments, session
        records and assessments.
      </p>
    </div>
  );
};

export default FooterBrand;
