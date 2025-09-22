"use client";

import { useState } from "react";
import {
  ChevronDown,
  User,
  Calendar,
  LogOut,
  Settings,
  Menu,
} from "lucide-react";
import DashboardProvider from "./DashboardProvider";
import useAuthStore from "../stores/authStore";

const useDashboard = DashboardProvider.useDashboard;

export function DashboardHeader({ showProfileDropdown = true }) {
  const { logout } = useAuthStore();

  const handleSignOut = async () => {
    await logout();
    window.location.href = "/";
  };
  const { setSidebarOpen } = useDashboard();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-accent"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="hidden md:block text-xl font-semibold text-card-foreground">
        Dashboard
      </h1>

      <h1 className="md:hidden text-lg font-semibold text-card-foreground">
        Dashboard
      </h1>

      {showProfileDropdown && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              <span>K</span>
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-medium text-card-foreground">
                Khuswant Rajpurohit
              </p>
              <p className="text-xs text-muted-foreground">
                khuswant.rajpurohit2024@nst.rishihood.edu.in
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-popover shadow-lg ring-1 ring-border focus:outline-none z-50">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-popover-foreground">
                    Khuswant Rajpurohit
                  </p>
                  <p className="text-sm text-muted-foreground">
                    khuswant.rajpurohit2024@nst.rishihood.edu.in
                  </p>
                </div>

                <div className="py-2">
                  <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-popover-foreground hover:bg-accent">
                    <User className="w-4 h-4" />
                    <span>Dashboard</span> 
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-popover-foreground hover:bg-accent">
                    <Calendar className="w-4 h-4" />
                    <span>My Meetings</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-popover-foreground hover:bg-accent">
                    <Settings className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </div>
                </div>

                <div className="h-px bg-border my-1" />

                <div className="py-2">
                  <div onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-destructive hover:bg-accent">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;
