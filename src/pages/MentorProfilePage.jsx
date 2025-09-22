"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  MapPin,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  MessageSquare,
  CheckCircle,
  X,
} from "lucide-react";
import { mentorsData } from "./data/mentor";
import { useParams } from "react-router-dom";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = new Date();
      time.setHours(hour, minute, 0, 0);
      const timeString = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      slots.push(timeString);
    }
  }
  return slots;
};

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date,
      dayName: date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase(),
      dayNumber: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return dates;
};

export default function MentorProfilePage() {
  const { id: mentorId } = useParams(); 

  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const mentor = mentorsData.find((m) => m.id.toString() === mentorId);

  if (!mentor) return <p>Mentor not found</p>; 

  const dates = generateDates();
  const timeSlots = generateTimeSlots();
  const visibleDates = dates.slice(currentDateIndex, currentDateIndex + 4);

  const nextDates = () => {
    if (currentDateIndex + 4 < dates.length) {
      setCurrentDateIndex(currentDateIndex + 1);
    }
  };

  const prevDates = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(currentDateIndex - 1);
    }
  };

  const SendMessage = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  }

  return (
    <div className="mt-[6rem] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={mentor.image || "/placeholder.svg"}
                      alt={mentor.name}
                    />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {mentor.name}
                      </h1>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Star className="w-3 h-3 mr-1" />
                        Star Mentor
                      </Badge>
                    </div>
                    <p className="text-lg text-gray-600 mb-2">{mentor.title}</p>
                    <p className="text-blue-600 font-medium">
                      {mentor.experience} at {mentor.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About
                </h2>
                <p className="text-gray-600 leading-relaxed">{mentor.bio}</p>
                <button className="text-blue-600 hover:text-blue-700 mt-2">
                  read more
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Education & Experience
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-600 rounded"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {mentor.company}
                      </p>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Indian Institute of Technology
                      </p>
                      <p className="text-sm text-gray-600">
                        Computer Science Engineering
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        Delhi, India
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-5 h-5 text-yellow-500 mr-1" />
                      <span className="font-bold text-lg">{mentor.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      ({mentor.mentees}+ Reviews)
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-blue-600 mr-1" />
                      <span className="font-bold text-lg">6223+</span>
                    </div>
                    <p className="text-sm text-gray-600">Mentoring Mins</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-green-600 mr-1" />
                      <span className="font-bold text-lg">
                        {mentor.mentees}+
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Mentees</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 
                className="text-xl font-semibold text-gray-900 mb-6">
                  Book a <span className="text-blue-600">Free 1:1 Trial</span>{" "}
                  To Plan Your Mentorship with {mentor.name}
                </h2> 

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Available Dates
                    </h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevDates}
                        disabled={currentDateIndex === 0}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextDates}
                        disabled={currentDateIndex + 4 >= dates.length}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {visibleDates.map((dateInfo, index) => (
                      <button
                        key={currentDateIndex + index}
                        onClick={() =>
                          setSelectedDate(currentDateIndex + index)
                        }
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedDate === currentDateIndex + index
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          {dateInfo.dayName}
                        </div>
                        <div className="font-medium">
                          {dateInfo.dayNumber} {dateInfo.month}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {dateInfo.availableSlots} Slots
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Available Slots
                  </h3>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.slice(0, 24).map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-lg border text-sm transition-colors ${
                            selectedTime === time
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={SendMessage}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={!selectedTime}
                >
                  Book a Free Trial for {dates[selectedDate]?.dayName}{" "}
                  {dates[selectedDate]?.dayNumber},{" "}
                  {selectedTime || "Select Time"}
                </Button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">For:</span>
                      <span className="ml-2 font-medium">
                        {mentor.targetAudience}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MessageSquare className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Targeting:</span>
                      <span className="ml-2 font-medium">
                        {mentor.targetRole}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Starting at</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{mentor.price.toLocaleString()}
                      <span className="text-sm font-normal text-gray-600">
                        /month
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Meeting Scheduled Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowPopup(false)}
          />
          
          {/* Popup Content */}
          <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-md w-full transform transition-all animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Meeting Scheduled!
            </h2>
            
            {/* Message */}
            <p className="text-gray-600 text-center mb-6">
              Your trial session with {mentor.name} has been successfully scheduled for{" "}
              {dates[selectedDate]?.dayName} {dates[selectedDate]?.dayNumber},{" "}
              {dates[selectedDate]?.month} at {selectedTime}.
            </p>
            
            {/* Action Button */}
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowPopup(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
