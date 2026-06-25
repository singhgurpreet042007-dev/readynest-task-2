import DashboardLayout from "@/components/layout/dashboard-layout";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import RecentTasks from "@/components/dashboard/recent-tasks";
import RecentNotices from "@/components/dashboard/recent-notices";
import TaskStatusChart from "@/components/charts/task-status-chart";
import AttendanceChart from "@/components/charts/attendance-chart";

export default function DashboardPage() {
return ( <DashboardLayout>


  <div
    className="
      mb-6
      rounded-3xl
      border
      border-blue-500/10
      bg-[#0D1328]
      px-6
      py-5
    "
  >
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Welcome back to Smart Campus.
        </p>
      </div>

      <div
        className="
          hidden lg:flex
          h-12 w-12
          items-center
          justify-center
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-violet-600
          text-white
          font-bold
        "
      >
        G
      </div>
    </div>
  </div>

  <DashboardStats />

  <div className="mt-5 grid gap-5 lg:grid-cols-2">
    <RecentTasks />
    <RecentNotices />
  </div>

  <div className="mt-5 grid gap-5 lg:grid-cols-2">
    <TaskStatusChart />
    <AttendanceChart />
  </div>

</DashboardLayout>


);
}
