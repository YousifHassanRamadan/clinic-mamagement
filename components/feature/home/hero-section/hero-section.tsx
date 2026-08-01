import React from "react";
import ChipWorkTime from "./chip-work-time/chip-work-time";
import HeroHeader from "./hero-header/hero-header";
import HeroDescription from "./hero-description/hero-description";
import HeroBtns from "./hero-btns/hero-btns";
import Experience from "./experience/experience";
import HeroImg from "./hero-img/hero-img";

const HeroSection = () => {
  return (
    <>
      <div className=" min-h-[90vh] pt-20 flex flex-col gap-10">
        <div className="work-time">
          <ChipWorkTime />
        </div>
        <div className="flex justify-between items-center gap-10">
          <div className="brief-section flex flex-col gap-10">
            <div className="header">
              <HeroHeader />
            </div>
            <div className="description">
              <HeroDescription />
            </div>
            <div className="buttons">
              <HeroBtns />
            </div>
            <div className="experience">
              <Experience />
            </div>
          </div>
          <div className="hero-section">
            <div className="hero">
              <HeroImg />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
