import { certificates } from "@/constants/home/home";
import { Award } from "lucide-react";
import CertificateBadge from "../certificate-badge/CertificateBadge";

const Certificates = () => {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />

        <h2 className="text-xl font-bold">Certificates</h2>
      </div>

      <div className="space-y-4">
        {certificates.map((certificate) => (
          <CertificateBadge key={certificate} title={certificate} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;
