import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { IconType } from "react-icons";

interface Props {
  title: string;
  href: string;
  icon: IconType;
}

const SocialButton = ({ title, href, icon: Icon }: Props) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-border
        bg-card
        px-5
        py-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary
        hover:bg-primary/5
      "
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <span className="font-medium">{title}</span>
    </Link>
  );
};

export default SocialButton;
