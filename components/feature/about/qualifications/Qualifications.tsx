import { qualifications } from "@/constants/home/home";
import { GraduationCap } from "lucide-react";
import QualificationCard from "./qualification-card/QualificationCard";
import Certificates from "./certificates/Certificates";

const Qualifications = () => {
  return (
    <section className="border-b border-border py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left */}

          <div>
            <div className="mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />

              <h2 className="text-xl font-bold">Qualifications</h2>
            </div>

            <div className="space-y-4">
              {qualifications.map((qualification) => (
                <QualificationCard
                  key={qualification.degree}
                  {...qualification}
                />
              ))}
            </div>
          </div>

          {/* Right */}

          <Certificates />
        </div>
      </div>
    </section>
  );
};

export default Qualifications;
