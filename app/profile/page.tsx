import DashboardLayout from "@/components/layout/dashboard-layout";

import ProfileHeader from "@/components/profile/profile-header";
import ProfileInfo from "@/components/profile/profile-info";
import ProfileStats from "@/components/profile/profile-stats";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProfileHeader />
        <ProfileInfo />
        <ProfileStats />
      </div>
    </DashboardLayout>
  );
}