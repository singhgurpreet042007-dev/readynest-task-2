import DashboardLayout from "@/components/layout/dashboard-layout";
import AttendanceForm from "@/components/attendance/attendance-form";
import AttendanceList from "@/components/attendance/attendance-list";
import { ClipboardCheck } from "lucide-react";

export default function AttendancePage() {
  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-6">

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          <ClipboardCheck size={16} />
          Attendance Management
        </div>

        <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-4xl font-bold text-transparent">
          Attendance
        </h1>

        <p className="mt-2 text-slate-400">
          Track, update and manage your subject-wise attendance.
        </p>

      </div>

      {/* Form */}

      <AttendanceForm />

      {/* List */}

      <AttendanceList />

    </DashboardLayout>
  );
}