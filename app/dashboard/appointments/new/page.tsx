import BookAppointment from "@/components/feature/dashboard/appointment/BookAppointment";

export default function AppointmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Book an appointment</h1>

        <p className="text-muted-foreground">
          Pick a date, choose a free slot and add anything the doctor should
          know.
        </p>
      </div>

      <BookAppointment />
    </div>
  );
}
