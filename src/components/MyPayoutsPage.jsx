"use client"

import { useState } from "react"
import { DollarSign, Download, Filter } from "lucide-react"

export default function MyPayoutsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")

  const payoutStats = [
    {
      title: "Total Earnings",
      value: "$4,250",
      change: "+23%",
      changeType: "positive",
    },
    {
      title: "This Month",
      value: "$1,200",
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Pending",
      value: "$350",
      change: "0%",
      changeType: "neutral",
    },
    {
      title: "Available",
      value: "$850",
      change: "+8%",
      changeType: "positive",
    },
  ]

  const payoutHistory = [
    {
      id: 1,
      date: "2024-01-10",
      amount: "$450",
      status: "completed",
      method: "Bank Transfer",
      sessions: 9,
    },
    {
      id: 2,
      date: "2024-01-03",
      amount: "$600",
      status: "completed",
      method: "PayPal",
      sessions: 12,
    },
    {
      id: 3,
      date: "2023-12-27",
      amount: "$380",
      status: "completed",
      method: "Bank Transfer",
      sessions: 8,
    },
    {
      id: 4,
      date: "2023-12-20",
      amount: "$520",
      status: "completed",
      method: "PayPal",
      sessions: 10,
    },
  ]

  const upcomingPayouts = [
    {
      id: 1,
      date: "2024-01-17",
      amount: "$350",
      status: "pending",
      sessions: 7,
    },
  ]

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-3">My Payouts 💰</h1>
            <p className="text-green-100 text-lg">Track your earnings and payout history</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="this-week" className="text-gray-900">This Week</option>
              <option value="this-month" className="text-gray-900">This Month</option>
              <option value="last-month" className="text-gray-900">Last Month</option>
              <option value="this-year" className="text-gray-900">This Year</option>
            </select>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg px-4 py-2 text-sm hover:bg-white/20 transition-colors duration-200 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {payoutStats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-50">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  stat.changeType === "positive"
                    ? "text-green-700 bg-green-100"
                    : stat.changeType === "negative"
                      ? "text-red-700 bg-red-100"
                      : "text-gray-700 bg-gray-100"
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
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Payout Methods</h3>
            <p className="text-gray-600">Manage your payment preferences</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div>
                <div className="font-medium text-gray-900">Bank Transfer</div>
                <div className="text-sm text-gray-600">****1234</div>
              </div>
              <div className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Primary</div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <div className="font-medium text-gray-900">PayPal</div>
                <div className="text-sm text-gray-600">k****@email.com</div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Edit</button>
            </div>
          </div>

          <button className="w-full mt-4 py-2 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Add Payment Method
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Upcoming Payouts</h3>
            <p className="text-gray-600">Scheduled payments</p>
          </div>

          <div className="space-y-4">
            {upcomingPayouts.map((payout) => (
              <div key={payout.id} className="p-4 border border-gray-200 rounded-lg bg-yellow-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-900">{payout.amount}</div>
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">{payout.status}</div>
                </div>
                <div className="text-sm text-gray-600">
                  {payout.sessions} sessions • {payout.date}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800 font-medium">Next payout in 3 days</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Actions</h3>
            <p className="text-gray-600">Manage your payouts</p>
          </div>

          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
              Request Payout
            </button>
            <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
              Update Payment Info
            </button>
            <button className="w-full py-3 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
              View Tax Documents
            </button>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-800">
              <strong>Tip:</strong> Payouts are processed weekly on Wednesdays.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Payout History</h3>
            <p className="text-gray-600">Your completed payouts</p>
          </div>
          <button className="flex items-center gap-2 py-2 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="space-y-4">
          {payoutHistory.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{payout.amount}</div>
                  <div className="text-sm text-gray-600">
                    {payout.sessions} sessions • {payout.method}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-900 font-medium">{payout.date}</div>
                <div className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full mt-1 font-medium">{payout.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
