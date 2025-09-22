"use client"

import { Users, DollarSign, Calendar, Eye, Star } from "lucide-react"

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$4,250",
      change: "+23%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "Total Sessions",
      value: "48",
      change: "+12%",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "Active Mentees",
      value: "24",
      change: "+8%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Profile Views",
      value: "156",
      change: "+15%",
      changeType: "positive",
      icon: Eye,
    },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 1200, sessions: 12 },
    { month: "Feb", revenue: 1800, sessions: 18 },
    { month: "Mar", revenue: 2200, sessions: 22 },
    { month: "Apr", revenue: 1900, sessions: 19 },
    { month: "May", revenue: 2800, sessions: 28 },
    { month: "Jun", revenue: 3200, sessions: 32 },
  ]

  const topSkills = [
    { skill: "JavaScript", sessions: 15, rating: 4.9 },
    { skill: "React", sessions: 12, rating: 4.8 },
    { skill: "Career Guidance", sessions: 10, rating: 4.9 },
    { skill: "Node.js", sessions: 8, rating: 4.7 },
    { skill: "Python", sessions: 6, rating: 4.8 },
  ]

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-3">Analytics 📊</h1>
        <p className="text-purple-100 text-lg">Track your mentoring performance and growth</p>
      </div>

      {/* Stats Cards in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-50">
                  <Icon className="w-6 h-6 text-purple-600" />
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
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Revenue Overview</h3>
            <p className="text-gray-600">Monthly revenue and session trends</p>
          </div>

          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-gray-200 rounded-full flex-1 max-w-32">
                        <div
                          className="h-3 bg-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${(data.revenue / 3200) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 min-w-16">
                        ${data.revenue}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-medium">{data.sessions} sessions</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Top Skills</h3>
            <p className="text-gray-600">Most requested skills and ratings</p>
          </div>

          <div className="space-y-4">
            {topSkills.map((item, index) => (
              <div key={item.skill} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.skill}</div>
                    <div className="text-sm text-gray-600">{item.sessions} sessions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Metrics</h3>
          <p className="text-gray-600">Key performance indicators for your mentoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-yellow-50 border border-yellow-100">
            <div className="text-4xl font-bold text-yellow-600 mb-3">4.9</div>
            <div className="text-sm text-gray-700 font-medium mb-2">Average Rating</div>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
              ))}
            </div>
          </div>

          <div className="text-center p-6 rounded-xl bg-green-50 border border-green-100">
            <div className="text-4xl font-bold text-green-600 mb-3">94%</div>
            <div className="text-sm text-gray-700 font-medium mb-2">Success Rate</div>
            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+2% from last month</div>
          </div>

          <div className="text-center p-6 rounded-xl bg-blue-50 border border-blue-100">
            <div className="text-4xl font-bold text-blue-600 mb-3">2.5h</div>
            <div className="text-sm text-gray-700 font-medium mb-2">Avg Session Length</div>
            <div className="text-xs text-gray-600 font-medium">Optimal duration</div>
          </div>
        </div>
      </div>
    </div>
  )
}
