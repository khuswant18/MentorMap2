"use client";

import DashboardLayout from "@/components/DashboardLayout";
import HomePage from "@/components/HomePage";
import BookingsPage from "@/components/BookingPage";
import AnalyticsPage from "@/components/AnalyticsPage";
import MyPayoutsPage from "@/components/MyPayoutsPage";
import EditProfileModal from "@/components/EditProfileModal";
import DashboardProvider from "@/components/DashboardProvider";

const useDashboard = DashboardProvider.useDashboard;

export default function DashboardPage() {

  
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

function DashboardContent() {
  const { currentPage, isProfileModalOpen, setIsProfileModalOpen } = useDashboard();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />; 
      case "bookings":
        return <BookingsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "my-payouts":
        return <MyPayoutsPage />;
      case "priority-dm":
        return <PriorityDMPage />;
      case "services":
        return <ServicesPage />;
      case "my-sessions":
        return <MySessionsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <DashboardLayout>
        {renderCurrentPage()}
      </DashboardLayout>

      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}

function PriorityDMPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Priority DM</h1>
        <p className="text-muted-foreground">
          Manage your priority direct messages
        </p>
      </div>
      <div className="border rounded-lg p-6 shadow-sm bg-card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            Coming Soon
          </h3>
          <p className="text-muted-foreground">
            Priority DM functionality will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Services</h1>
        <p className="text-muted-foreground">
          Manage your mentoring services and offerings
        </p>
      </div>
      <div className="border rounded-lg p-6 shadow-sm bg-card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            Coming Soon
          </h3>
          <p className="text-muted-foreground">
            Services management will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}

function MySessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">My Sessions</h1>
        <p className="text-muted-foreground">
          View and manage your mentoring sessions
        </p>
      </div>
      <div className="border rounded-lg p-6 shadow-sm bg-card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            Coming Soon
          </h3>
          <p className="text-muted-foreground">
            Session management will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings
        </p>
      </div>
      <div className="border rounded-lg p-6 shadow-sm bg-card">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            Coming Soon
          </h3>
          <p className="text-muted-foreground">
            Profile management will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}
