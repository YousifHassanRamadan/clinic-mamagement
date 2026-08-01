import { Experiences } from "@/constants/home/home";
import React from "react";

const Experience = () => {
  return (
    <div className="flex items-center gap-10">
      {Experiences.map((exp, index) => (
        <div key={index}>
          <h3 className="text-xl font-bold">{exp.title}</h3>
          <p className="text-muted-foreground text-xs">{exp.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default Experience;
