import { Button } from "@/components/ui/button";

import { getDashboardStats } from "@/app/actions/admin-actions/dashboard/get-dashboard-stats";

import SessionItem from "./SessionItem";

const RecentSessions = async () => {
  const result = await getDashboardStats();

  if (!result.success || !result.data) {
    return (
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Sessions</h2>

          <Button variant="ghost">View All</Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Unable to load your recent sessions.
        </p>
      </section>
    );
  }

  const sessions = result.data.recentSessions;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Sessions</h2>

        <Button variant="ghost">View All</Button>
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-6">
          <p className="text-sm text-muted-foreground">
            You don't have any sessions yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <SessionItem
              key={session.id}
              title={formatSessionType(session.type)}
              date={formatSessionDate(session.date)}
              mood={formatMood(session.mood)}
              status={session.status}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const formatSessionType = (type: string) => {
  return type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatSessionDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const formatMood = (mood: string | null) => {
  if (!mood) {
    return "No Data";
  }

  return mood
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default RecentSessions;
