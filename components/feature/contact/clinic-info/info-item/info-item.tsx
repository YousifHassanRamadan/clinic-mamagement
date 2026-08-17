import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  value: string;
}

const InfoItem = ({ icon: Icon, title, value }: Props) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-semibold">{title}</h4>

        <p className="text-sm leading-6 text-muted-foreground">{value}</p>
      </div>
    </div>
  );
};

export default InfoItem;
