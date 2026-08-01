import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";

const LogoSection = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="logo">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </div>
      <div className="text">
        <p className="text-foreground font-bold">MindCare</p>
      </div>
    </div>
  );
};

export default LogoSection;
