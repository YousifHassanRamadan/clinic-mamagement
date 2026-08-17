import { cn } from "@/lib/utils";

type AppointmentTab = "upcoming" | "completed" | "cancelled";

interface Props {
  activeTab: AppointmentTab;
  setActiveTab: (value: AppointmentTab) => void;
  upcomingCount: number;
  completedCount: number;
  cancelledCount: number;
}

const AppointmentTabs = ({
  activeTab,
  setActiveTab,
  upcomingCount,
  completedCount,
  cancelledCount,
}: Props) => {
  const tabs = [
    {
      title: `Upcoming (${upcomingCount})`,
      value: "upcoming" as const,
    },
    {
      title: `Completed (${completedCount})`,
      value: "completed" as const,
    },
    {
      title: `Cancelled (${cancelledCount})`,
      value: "cancelled" as const,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => setActiveTab(tab.value)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            activeTab === tab.value
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-muted",
          )}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default AppointmentTabs;
