"use client"

import { Calendar, Users, DollarSign, TrendingUp, Clock, Video, MessageCircle } from "lucide-react"

export default function HomePage() {
  const stats = [
    {
      title: "Total Meetings",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "Active Mentees",
      value: "18",
      change: "+8%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Monthly Earnings",
      value: "$2,450",
      change: "+23%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2%",
      changeType: "positive",
      icon: TrendingUp,
    },
  ]



  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-3">Welcome back, Khuswant! 👋</h1>
        <p className="text-blue-100 text-lg">Here's what's happening with your mentoring today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.changeType === "positive" 
                      ? "text-green-700 bg-green-100" 
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.title}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
            <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">View All</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Video className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Career Guidance Session</p>
                <p className="text-sm text-gray-600">Today at 2:00 PM with Sarah Johnson</p>
              </div>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                Join
              </button>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">JavaScript Mentoring</p>
                <p className="text-sm text-gray-600">Tomorrow at 10:00 AM with Mike Chen</p>
              </div>
              <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">View All</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Session completed with Alex Rodriguez</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New mentee request from Emma Wilson</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment received for React mentoring</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Profile viewed 12 times this week</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
