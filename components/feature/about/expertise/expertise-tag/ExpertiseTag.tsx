import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
}

const ExpertiseTag = ({ title }: Props) => {
  return (
    <Badge
      variant="secondary"
      className="
        rounded-full
        px-5
        py-2
        text-sm
        font-medium
        transition-all
        duration-300
        hover:bg-primary
        hover:text-primary-foreground
        cursor-default
      "
    >
      {title}
    </Badge>
  );
};

export default ExpertiseTag;
