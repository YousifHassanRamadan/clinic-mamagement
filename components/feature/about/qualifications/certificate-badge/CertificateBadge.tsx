import { CheckCircle2 } from "lucide-react";

interface Props {
  title: string;
}

const CertificateBadge = ({ title }: Props) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-colors hover:bg-primary/5">
      <CheckCircle2 className="h-5 w-5 text-success" />

      <span className="text-sm">{title}</span>
    </div>
  );
};

export default CertificateBadge;
