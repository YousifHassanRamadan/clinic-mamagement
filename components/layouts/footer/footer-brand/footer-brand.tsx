// components/feature/layout/footer/footer-brand/footer-brand.tsx

import logo from "@/assets/logo.png";
import Image from "next/image";

interface Props {
  translations: {
    name: string;
    description: string;
  };
}

const FooterBrand = ({ translations }: Props) => {
  return (
    <div className="block">
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt={translations.name}
          width={50}
          height={50}
          className="rounded-2xl"
        />

        <p className="text-lg font-bold text-foreground">{translations.name}</p>
      </div>

      <p className="mt-4 max-w-md leading-8 text-muted-foreground">
        {translations.description}
      </p>
    </div>
  );
};

export default FooterBrand;
