import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  icon: LucideIcon;
  href: string;
}

const ActionCard = ({ title, icon: Icon, href }: Props) => {
  return (
    <Link href={href} className="block">
      <Card className="group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
          <Icon className="h-7 w-7 text-primary group-hover:text-white" />
        </div>

        <h3 className="mt-5 font-semibold">{title}</h3>
      </Card>
    </Link>
  );
};

export default ActionCard;
