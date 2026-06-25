import Sidebar from "@/components/layout/sidebar";
import TopNavbar from "@/components/layout/top-navbar";
import BottomNav from "@/components/mobile/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <TopNavbar />

        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}