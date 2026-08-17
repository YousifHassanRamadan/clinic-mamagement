import { Card } from "@/components/ui/card";

interface TimelineItemProps {
  period: string;
  title: string;
  company: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem = ({
  period,
  title,
  company,
  description,
  isLast = false,
}: TimelineItemProps) => {
  return (
    <div className="relative flex gap-6">
      {/* Timeline */}

      <div className="flex flex-col items-center mt-16">
        <div className="h-3 w-3 rounded-full bg-primary" />

        {!isLast && <div className="mt-2 h-full w-px bg-border" />}
      </div>

      {/* Content */}

      <Card className="block mb-8 flex-1 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md">
        <span className="text-sm font-medium text-primary">{period}</span>

        <h3 className="mt-2 text-xl font-semibold">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground">{company}</p>

        <p className="mt-4 leading-7 text-muted-foreground">{description}</p>
      </Card>
    </div>
  );
};

export default TimelineItem;
