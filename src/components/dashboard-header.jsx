"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, LogOut, User, Calendar } from "lucide-react"


export function DashboardHeader({ title, description }) {
  return (
    <header className="flex items-center justify-between p-6 bg-background border-b border-border">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">K</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
            <div className="p-4 border-b border-border">
              <p className="font-semibold text-lg text-foreground">Khuswant Rajpurohit</p>
              <p className="text-sm text-muted-foreground">khuswant.rajpurohit2024@nst.rishihood.edu.in</p>
            </div>
            <div className="p-2">
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md cursor-pointer">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-base">Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md cursor-pointer">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-base">My Meetings</span>
              </DropdownMenuItem>
            </div>
            <div className="p-2 border-t border-border">
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-md cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="h-5 w-5" />
                <span className="text-base">Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
