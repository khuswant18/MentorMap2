"use client";
import {
  Home,
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  DollarSign,
  User,
  X,
} from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import DashboardProvider from "./DashboardProvider";

// Get the hook from the provider
const useDashboard = DashboardProvider.useDashboard;

const navigationItems = [
  { id: "home", label: "Home", icon: Home, href: "/dashboard" },
  {
    id: "bookings",
    label: "Bookings",
    icon: Calendar,
    href: "/dashboard/bookings",
  },
  {
    id: "priority-dm",
    label: "Priority DM",
    icon: MessageSquare,
    href: "/dashboard/priority-dm",
  },
  {
    id: "services",
    label: "Services",
    icon: Settings,
    href: "/dashboard/services",
  },
  {
    id: "my-sessions",
    label: "My Sessions",
    icon: Calendar,
    href: "/dashboard/my-sessions",
  },
  {
    id: "my-payouts",
    label: "My Payouts",
    icon: DollarSign,
    href: "/dashboard/my-payouts",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  { id: "profile", label: "Profile", icon: User, href: "/dashboard/profile" },
];

export default function DashboardLayout({ children }) {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } = useDashboard();

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setSidebarOpen(false); 
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />  
        )}

        <aside
          className={`w-64 bg-sidebar border-r border-sidebar-border flex flex-col ${
            sidebarOpen
              ? "fixed inset-y-0 left-0 z-40 md:relative"
              : "hidden md:flex"
          }`}
        > 
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                MentorMap
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 rounded-lg hover:bg-sidebar-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
              <div className="w-10 h-10 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-semibold">
                <span>K</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Khuswant Rajpurohit
                </p>
                <p className="text-xs text-muted-foreground truncate">Mentor</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <DashboardHeader />

          <div className="flex-1 p-6 bg-background">{children}</div>
        </main>
      </div>
    </div>
  );
}
