import DashboardLayout from "@/components/layout/dashboard-layout";
import AttendanceForm from "@/components/attendance/attendance-form";
import AttendanceList from "@/components/attendance/attendance-list";

export default function AttendancePage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Attendance
        </h1>

        <p className="mt-2 text-slate-500">
          Track your attendance.
        </p>
      </div>

      <AttendanceForm />

      <AttendanceList />
    </DashboardLayout>
  );
}