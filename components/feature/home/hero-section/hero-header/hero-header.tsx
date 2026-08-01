import React from "react";

const HeroHeader = () => {
  return (
    <div className="text-6xl font-bold">
      <p className=" text-foreground">
        A calmer mind,
        <span className="block text-primary">
          one session at a<span className="block text-primary">time</span>
        </span>
      </p>
    </div>
  );
};

export default HeroHeader;
