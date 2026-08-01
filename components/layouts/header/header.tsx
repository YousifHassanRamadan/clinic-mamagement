import React from "react";
import LogoSection from "./logo/logo";
import LinksSection from "./links/links";
import ButtonsSection from "./btns/btns";

const Header = () => {
  return (
    <div className="w-full bg-background">
      <header className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center ">
        <div className="logo">
          <LogoSection />
        </div>
        <div className="links">
          <LinksSection />
        </div>
        <div className="btns">
          <ButtonsSection />
        </div>
      </header>
    </div>
  );
};

export default Header;
