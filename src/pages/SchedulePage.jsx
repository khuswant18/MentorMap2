import React from 'react'
import { Calendar, Clock, Users, Sparkles } from 'lucide-react'

const SchedulePage = () => {
  return (
    <div className="mt-[8rem] min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">

        <h1 className="text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
          Coming Soon
        </h1>  

        <h2 className="text-2xl font-semibold text-blue-600 mb-6 animate-fade-in-delay">
          Schedule Management
        </h2>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in-delay-2">
          We're working hard to bring you an amazing scheduling experience. 
          Soon you'll be able to manage all your mentoring sessions, 
          view upcoming meetings, and organize your calendar seamlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
            <Calendar className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
            <h3 className="font-semibold text-gray-800 mb-2">Smart Scheduling</h3>
            <p className="text-gray-600 text-sm">Intelligent calendar management with conflict detection</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up-delay">
            <Clock className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
            <h3 className="font-semibold text-gray-800 mb-2">Time Tracking</h3>
            <p className="text-gray-600 text-sm">Track session duration and manage your time effectively</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up-delay-2">
            <Users className="w-8 h-8 text-green-500 mb-3 mx-auto" />
            <h3 className="font-semibold text-gray-800 mb-2">Meeting Management</h3>
            <p className="text-gray-600 text-sm">Organize all your mentoring sessions in one place</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up-delay-3">
            <Sparkles className="w-8 h-8 text-yellow-500 mb-3 mx-auto" />
            <h3 className="font-semibold text-gray-800 mb-2">Smart Reminders</h3>
            <p className="text-gray-600 text-sm">Never miss a session with intelligent notifications</p>
          </div>
        </div>

        <div className="bg-white/50 rounded-full p-2 max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Development in Progress...</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fade-in-delay { animation: fade-in 1s ease-out 0.3s both; }
        .animate-fade-in-delay-2 { animation: fade-in 1s ease-out 0.6s both; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.8s both; }
        .animate-slide-up-delay { animation: slide-up 0.8s ease-out 1s both; }
        .animate-slide-up-delay-2 { animation: slide-up 0.8s ease-out 1.2s both; }
        .animate-slide-up-delay-3 { animation: slide-up 0.8s ease-out 1.4s both; }
        .animate-shimmer::before { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  )
}

export default SchedulePage
