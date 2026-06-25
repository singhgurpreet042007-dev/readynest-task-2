import DashboardLayout from "@/components/layout/dashboard-layout";
import NoticeForm from "@/components/notices/notice-form";
import NoticeList from "@/components/notices/notice-list";
import { BellRing } from "lucide-react";

export default function NoticesPage() {
  return (
    <DashboardLayout>

      {/* Header */}

      <div className="relative mb-6 overflow-hidden rounded-2xl border border-violet-500/20 bg-[#0F172A] p-6 shadow-lg">

        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex items-center justify-between">

          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
              <BellRing className="text-violet-400" />
              Notices
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Publish and manage campus announcements.
            </p>
          </div>

          <div className="hidden lg:flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 shadow-lg">
            <BellRing size={26} className="text-white" />
          </div>

        </div>

      </div>

      <NoticeForm />

      <NoticeList />

    </DashboardLayout>
  );
}