import { Button } from "@/components/ui/button";

const AppointmentAction = () => {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button className="rounded-xl">Join Session</Button>

      <Button variant="outline" className="rounded-xl">
        Reschedule
      </Button>
    </div>
  );
};

export default AppointmentAction;
