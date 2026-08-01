import React from "react";
import DoctorImg from "./doctor-img/doctor-img";
import Breif from "./breif/breif";

const AboutDoctor = () => {
  return (
    <div className="py-40 flex justify-between items-center">
      <div className="doc-img ">
        <DoctorImg />
      </div>
      <div className="brief">
        <Breif />
      </div>
    </div>
  );
};

export default AboutDoctor;
