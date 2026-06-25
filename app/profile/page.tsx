import DashboardLayout from "@/components/layout/dashboard-layout";

import ProfileHeader from "@/components/profile/profile-header";
import ProfileInfo from "@/components/profile/profile-info";

import { UserCircle2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          <UserCircle2 size={16} />
          Student Profile
        </div>

        <h1 className="mt-3 bg-gradient-to-r from-violet-300 via-fuchsia-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">
          My Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your personal information.
        </p>
      </div>

      <div className="space-y-6">
        <ProfileHeader />
        <ProfileInfo />
      </div>
    </DashboardLayout>
  );
}