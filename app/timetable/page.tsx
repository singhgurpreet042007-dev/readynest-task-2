import DashboardLayout from "@/components/layout/dashboard-layout";
import TimetableForm from "@/components/timetable/timetable-form";
import TimetableList from "@/components/timetable/timetable-list";

export default function TimetablePage() {
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">
        Timetable
      </h1>

      <TimetableForm />

      <TimetableList />
    </DashboardLayout>
  );
}