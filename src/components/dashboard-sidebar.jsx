"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Calendar,
  MessageSquare,
  Star,
  Settings,
  CreditCard,
  BarChart3,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: Calendar,
  },
  {
    title: "Priority DM",
    href: "/dashboard/priority-dm",
    icon: MessageSquare,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Settings,
  },
  {
    title: "My Sessions",
    href: "/dashboard/sessions",
    icon: Star,
  },
  {
    title: "My Payouts",
    href: "/dashboard/payouts",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
]



export function DashboardSidebar({ className }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="font-semibold text-sidebar-foreground">MentorHub</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent",
                    collapsed && "justify-center px-2",
                    isActive && "bg-primary/10 text-primary border-r-2 border-primary font-medium",
                  )}
                >
                  <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-primary")} />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
