import DoctorImage from "../doctor-imag/DoctorImage";
import DoctorInfo from "../doctor-info/DoctorInfo";

const AboutHero = () => {
  return (
    <section className="border-b border-border ">
      <div className="container mx-auto px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <DoctorImage />

          <DoctorInfo />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
