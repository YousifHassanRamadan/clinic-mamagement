import { quickActions } from "@/constants/dashboard/dashboard";
import ActionCard from "./ActionCard";

const QuickActions = () => {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-semibold">Quick Actions</h2>

      <div className="grid gap-5 lg:grid-cols-3  sm:grid-cols-2">
        {quickActions.map((action) => (
          <ActionCard key={action.title} {...action} />
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
