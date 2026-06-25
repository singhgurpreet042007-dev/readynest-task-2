import DashboardLayout from "@/components/layout/dashboard-layout";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import RecentTasks from "@/components/dashboard/recent-tasks";
import RecentNotices from "@/components/dashboard/recent-notices";
import TaskStatusChart from "@/components/charts/task-status-chart";
import AttendanceChart from "@/components/charts/attendance-chart";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="relative mb-6 overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#0b1220] via-[#111827] to-[#1e293b] p-6 shadow-xl">

        {/* Glow */}
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative flex items-center justify-between">

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              <Sparkles size={14} />
              ReadyNest Dashboard
            </div>

            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-3xl font-bold text-transparent">
              Welcome Back 👋
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage your attendance, notes, notices and daily tasks from one place.
            </p>
          </div>

          <div className="hidden lg:flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/30">
            G
          </div>

        </div>
      </div>

      {/* Live Backend Stats */}
      <DashboardStats />

      {/* Recent Section */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RecentTasks />
        <RecentNotices />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <TaskStatusChart />
        <AttendanceChart />
      </div>
    </DashboardLayout>
  );
}