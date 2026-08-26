"use client";

interface AppointmentHeaderProps {
  scheduling: string;
  title: string;
  description: string;
}

const AppointmentHeader = ({
  scheduling,
  title,
  description,
}: AppointmentHeaderProps) => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {scheduling}
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AppointmentHeader;
