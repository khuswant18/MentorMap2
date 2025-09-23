"use client"

import React from "react"
import DashboardProvider from "@/components/DashboardProvider"
import StudentHomePage from "../components/StudentHomePage"
import StudentBookingsPage from "../components/StudentBookingsPage"
import StudentMentorsPage from "../components/StudentMentorsPage"
import DashboardHeader from "@/components/DashboardHeader"

// Page title mapping
const getPageTitle = (activePage) => {
  const titles = {
    home: "Dashboard",
    bookings: "My Bookings",
    mentors: "My Mentors"
  }
  return titles[activePage] || "Dashboard"
}

// Main dashboard content component
function DashboardContent() {
  const [activePage, setActivePage] = React.useState("home")
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  const sidebarItems = [
    { id: "home", label: "Dashboard", icon: "🏠" },
    { id: "bookings", label: "My Bookings", icon: "📅" },
    { id: "mentors", label: "My Mentors", icon: "👥" }
  ]

  const renderPageContent = () => {
    switch (activePage) {
      case "home":
        return <StudentHomePage />
      case "bookings":
        return <StudentBookingsPage />
      case "mentors":
        return <StudentMentorsPage />
      default:
        return <StudentHomePage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        title={getPageTitle(activePage)}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigate={setActivePage}
      />

      <div className="flex">
        <aside className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-card border-r border-border transition-all duration-300 min-h-[calc(100vh-4rem)] fixed left-0 top-16 z-10`}>
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      activePage === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    {isSidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } transition-all duration-300 pt-16`}>
          {renderPageContent()}
        </main>
      </div>
    </div>
  )
}

const StudentDashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}

export default StudentDashboard