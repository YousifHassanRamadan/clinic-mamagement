import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed text-center">
      <Inbox className="mb-3 h-10 w-10 text-muted-foreground" />

      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;
