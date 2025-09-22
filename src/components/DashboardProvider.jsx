"use client"

import { createContext, useContext, useState} from "react"

const DashboardContext = createContext(null)


export default function DashboardProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("home")
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DashboardContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isDarkMode,
        setIsDarkMode,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

DashboardProvider.useDashboard = function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
