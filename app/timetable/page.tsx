import DashboardLayout from "@/components/layout/dashboard-layout";
import TimetableForm from "@/components/timetable/timetable-form";
import TimetableList from "@/components/timetable/timetable-list";
import { CalendarDays } from "lucide-react";

export default function TimetablePage() {
  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-5">
  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-300">
    <CalendarDays size={14} />
    Weekly Schedule
  </div>

  <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-3xl font-bold text-transparent">
    Timetable
  </h1>

  <p className="mt-1 text-sm text-slate-400">
    Organize your weekly classes.
  </p>
</div>

      <TimetableForm />

      <TimetableList />

    </DashboardLayout>
  );
}