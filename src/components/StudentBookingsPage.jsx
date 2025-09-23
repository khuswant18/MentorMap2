"use client"

import { useState } from "react"
import { Calendar, Clock, User, Video, MessageCircle, Filter, Search, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function StudentBookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const bookings = {
    upcoming: [
      {
        id: 1,
        title: "React Development Session",
        mentor: "John Smith",
        date: "2024-01-15",
        time: "3:00 PM - 4:00 PM",
        type: "video",
        status: "confirmed",
        price: "$50",
        mentorAvatar: "JS",
        expertise: "React Developer at Google"
      },
      {
        id: 2,
        title: "Career Guidance Session",
        mentor: "Sarah Johnson",
        date: "2024-01-16",
        time: "11:00 AM - 12:00 PM",
        type: "video",
        status: "pending",
        price: "$40",
        mentorAvatar: "SJ",
        expertise: "Career Counselor"
      },
      {
        id: 3,
        title: "Web Design Workshop",
        mentor: "Mike Chen",
        date: "2024-01-17",
        time: "2:00 PM - 3:30 PM",
        type: "video",
        status: "confirmed",
        price: "$60",
        mentorAvatar: "MC",
        expertise: "UX Designer at Facebook"
      }
    ],
    completed: [
      {
        id: 4,
        title: "JavaScript Fundamentals",
        mentor: "Alex Rodriguez",
        date: "2024-01-10",
        time: "4:00 PM - 5:00 PM",
        type: "video",
        status: "completed",
        price: "$45",
        mentorAvatar: "AR",
        expertise: "Frontend Developer",
        rating: 5
      },
      {
        id: 5,
        title: "Portfolio Review",
        mentor: "Emily Davis",
        date: "2024-01-08",
        time: "1:00 PM - 2:00 PM",
        type: "video",
        status: "completed",
        price: "$35",
        mentorAvatar: "ED",
        expertise: "Product Manager",
        rating: 4
      }
    ],
    cancelled: [
      {
        id: 6,
        title: "Python Basics",
        mentor: "David Wilson",
        date: "2024-01-05",
        time: "10:00 AM - 11:00 AM",
        type: "video",
        status: "cancelled",
        price: "$40",
        mentorAvatar: "DW",
        expertise: "Backend Developer"
      }
    ]
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-700 bg-green-100"
      case "pending":
        return "text-yellow-700 bg-yellow-100"
      case "cancelled":
        return "text-red-700 bg-red-100"
      case "completed":
        return "text-blue-700 bg-blue-100"
      default:
        return "text-gray-700 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">My Sessions</h1>
          <p className="text-muted-foreground">
            Manage your mentorship sessions and bookings
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background text-foreground hover:bg-accent transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { key: "upcoming", label: "Upcoming", count: bookings.upcoming.length },
            { key: "completed", label: "Completed", count: bookings.completed.length },
            { key: "cancelled", label: "Cancelled", count: bookings.cancelled.length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              {tab.label}
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-muted text-muted-foreground">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        {bookings[activeTab].map((booking) => (
          <div
            key={booking.id}
            className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {booking.mentorAvatar}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-1">
                    {booking.title}
                  </h3>
                  <p className="text-muted-foreground mb-2">{booking.mentor}</p>
                  <p className="text-sm text-muted-foreground mb-3">{booking.expertise}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {booking.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {booking.time}
                    </div>
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-1" />
                      Video Call
                    </div>
                  </div>

                  {booking.rating && (
                    <div className="mt-3">
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">Your Rating:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < booking.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center mb-3">
                  {getStatusIcon(booking.status)}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-lg font-bold text-card-foreground mb-4">{booking.price}</p>
                
                <div className="flex flex-col space-y-2">
                  {booking.status === "confirmed" && activeTab === "upcoming" && (
                    <>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm cursor-pointer">
                        Join Session
                      </button>
                      <button className="px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors text-sm cursor-pointer">
                        Reschedule
                      </button>
                    </>
                  )}
                  
                  {booking.status === "pending" && (
                    <>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm cursor-pointer">
                        Confirm
                      </button>
                      <button className="px-4 py-2 border border-destructive text-destructive rounded-md hover:bg-destructive/10 transition-colors text-sm cursor-pointer">
                        Cancel
                      </button>
                    </>
                  )}
                  
                  {booking.status === "completed" && (
                    <>
                      <button className="px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors text-sm cursor-pointer">
                        Book Again
                      </button>
                      {!booking.rating && (
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm cursor-pointer">
                          Rate Session
                        </button>
                      )}
                    </>
                  )}

                  <button className="px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors text-sm flex items-center justify-center cursor-pointer">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings[activeTab].length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            No {activeTab} sessions
          </h3>
          <p className="text-muted-foreground mb-4">
            {activeTab === "upcoming" && "You don't have any upcoming sessions scheduled."}
            {activeTab === "completed" && "You haven't completed any sessions yet."}
            {activeTab === "cancelled" && "You don't have any cancelled sessions."}
          </p>
          {activeTab === "upcoming" && (
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer">
              Browse Mentors
            </button>
          )}
        </div>
      )}
    </div>
  )
}