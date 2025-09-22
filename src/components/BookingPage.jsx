"use client"

import { useState } from "react"
import { Calendar, Clock, User, Video, MessageCircle, Filter, Search } from "lucide-react"

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const bookings = {
    upcoming: [
      {
        id: 1,
        title: "Career Guidance Session",
        mentee: "Sarah Johnson",
        date: "2024-01-15",
        time: "2:00 PM - 3:00 PM",
        type: "video",
        status: "confirmed",
        price: "$50",
      },
      {
        id: 2,
        title: "Technical Interview Prep",
        mentee: "Mike Chen",
        date: "2024-01-15",
        time: "4:30 PM - 5:30 PM",
        type: "video",
        status: "confirmed",
        price: "$50",
      },
      {
        id: 3,
        title: "Resume Review",
        mentee: "Emily Davis",
        date: "2024-01-16",
        time: "10:00 AM - 11:00 AM",
        type: "chat",
        status: "pending",
        price: "$40",
      },
    ],
    completed: [
      {
        id: 4,
        title: "Portfolio Review",
        mentee: "John Doe",
        date: "2024-01-10",
        time: "3:00 PM - 4:00 PM",
        type: "video",
        status: "completed",
        price: "$50",
      },
      {
        id: 5,
        title: "Career Planning",
        mentee: "Lisa Wang",
        date: "2024-01-08",
        time: "1:00 PM - 2:00 PM",
        type: "video",
        status: "completed",
        price: "$50",
      },
    ],
  }

  const currentBookings = bookings[activeTab]

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">

      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-3">Bookings 📅</h1>
        <p className="text-indigo-100 text-lg">Manage your mentoring sessions and appointments</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-indigo-50">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full text-green-700 bg-green-100">+15%</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600 font-medium">This Month</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full text-green-700 bg-green-100">+3</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-sm text-gray-600 font-medium">This Week</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-50">
              <User className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full text-blue-700 bg-blue-100">Today</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-sm text-gray-600 font-medium">Sessions Today</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-50">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded-full text-green-700 bg-green-100">+23%</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">$1,200</div>
            <div className="text-sm text-gray-600 font-medium">Total Earnings</div>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium">
            1:1 calls
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
            Package
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
            Webinar
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
            Digital Product
          </button>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "upcoming"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming Sessions
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "completed"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Completed Sessions
          </button>
        </div>
      </div>


      <div className="space-y-4">
        {currentBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${booking.type === "video" ? "bg-indigo-50" : "bg-blue-50"}`}>
                  {booking.type === "video" ? (
                    <Video className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{booking.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{booking.mentee}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{booking.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{booking.price}</div>
                  <div
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status}
                  </div>
                </div>

                {activeTab === "upcoming" && (
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-sm">
                    {booking.type === "video" ? "Join Call" : "Open Chat"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>


      {currentBookings.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">No {activeTab} bookings</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {activeTab === "upcoming"
              ? "You don't have any upcoming sessions scheduled. Share your profile to get more bookings!"
              : "You haven't completed any sessions yet. Your completed sessions will appear here."}
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-sm">
            {activeTab === "upcoming" ? "Share Your Page" : "View Profile"}
          </button>
        </div>
      )}
    </div>
  )
}
