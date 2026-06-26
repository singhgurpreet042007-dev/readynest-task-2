import Sidebar from "@/components/layout/sidebar";
import TopNavbar from "@/components/layout/top-navbar";
import BottomNav from "@/components/mobile/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-[#050816] text-white flex">

      {/* Sidebar (desktop only space efficient) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main */}
      <main className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navbar (compact height) */}
        <div className="shrink-0 border-b border-white/5">
          <TopNavbar />
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 space-y-4">
          {children}
        </div>

      </main>

      {/* Mobile nav only */}
      <div className="lg:hidden">
        <BottomNav />
      </div>

    </div>
  );
}