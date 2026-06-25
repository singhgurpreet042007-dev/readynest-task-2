import DashboardLayout from "@/components/layout/dashboard-layout";
import NoticeForm from "@/components/notices/notice-form";
import NoticeList from "@/components/notices/notice-list";

export default function NoticesPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Notices
        </h1>

        <p className="mt-2 text-slate-500">
          Manage campus notices.
        </p>
      </div>

      <NoticeForm />

      <NoticeList />
    </DashboardLayout>
  );
}