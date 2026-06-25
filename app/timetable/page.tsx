import DashboardLayout from "@/components/layout/dashboard-layout";
import TimetableForm from "@/components/timetable/timetable-form";
import TimetableList from "@/components/timetable/timetable-list";
import { CalendarDays } from "lucide-react";

export default function TimetablePage() {
  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-6">

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          <CalendarDays size={16} />
          Weekly Schedule
        </div>

        <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-4xl font-bold text-transparent">
          Timetable
        </h1>

        <p className="mt-2 text-slate-400">
          Organize and manage your daily class schedule.
        </p>

      </div>

      <TimetableForm />

      <TimetableList />

    </DashboardLayout>
  );
}