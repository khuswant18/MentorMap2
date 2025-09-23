"use client"

import { Calendar, Users, BookOpen, TrendingUp, Search, Video, MessageCircle, Star } from "lucide-react"

export default function StudentHomePage() {
  const stats = [
    {
      title: "Mentors Connected",
      value: "5",
      change: "+2 this week",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Sessions Completed",
      value: "12",
      change: "+3 this month",
      changeType: "positive",
      icon: BookOpen,
    },
    {
      title: "Upcoming Sessions",
      value: "3",
      change: "This week",
      changeType: "neutral",
      icon: Calendar,
    },
    {
      title: "Learning Progress",
      value: "85%",
      change: "+12% improvement",
      changeType: "positive",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-3">Welcome back! 🎓</h1>
        <p className="text-purple-100 text-lg">Continue your learning journey with amazing mentors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-50">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.changeType === "positive" 
                      ? "text-green-700 bg-green-100" 
                      : stat.changeType === "neutral"
                      ? "text-blue-700 bg-blue-100"
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


    </div>
  )
}