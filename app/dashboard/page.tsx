import DashboardLayout from "@/components/layout/dashboard-layout";

import DashboardStats from "@/components/dashboard/dashboard-stats";
import RecentTasks from "@/components/dashboard/recent-tasks";
import RecentNotices from "@/components/dashboard/recent-notices";

import TaskStatusChart from "@/components/charts/task-status-chart";
import AttendanceChart from "@/components/charts/attendance-chart";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">

        {/* Header */}
        <div className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3">
          <h1 className="text-lg font-semibold text-white">
            👋 Welcome Back
          </h1>
          <p className="text-xs text-slate-400">
            Everything organized in one place
          </p>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Section 1 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <RecentTasks />
          <RecentNotices />
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TaskStatusChart />
          <AttendanceChart />
        </div>

      </div>
    </DashboardLayout>
  );
}