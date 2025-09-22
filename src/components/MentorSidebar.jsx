"use client"

import { X, Star, MapPin, Heart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useEffect, useRef } from "react"

export function MentorSidebar({ mentor, isOpen, onClose }) {
  const sidebarRef = useRef(null)

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.offsetHeight
    }
  }, [isOpen])

  if (!mentor) return null

  return (
    <>

      <div
        onClick={onClose}
        style={{
          backdropFilter: isOpen ? 'blur(4px)' : 'blur(0px)',
          transition: 'opacity 300ms ease-out, backdrop-filter 300ms ease-out, visibility 300ms ease-out'
        }}
      />


      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full md:w-[55%] bg-white z-50 overflow-y-auto border-l border-blue-200
          transform transition-all duration-500 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"} 
        `}
        style={{
          willChange: 'transform',
          transition: 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div className="p-6">

          <div className={`flex items-center justify-between mb-6 transform transition-all duration-400 ease-out ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
          style={{ 
            transitionDelay: isOpen ? "150ms" : "0ms",
            willChange: 'transform, opacity'
          }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="cursor-pointer hover:bg-blue-100 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="cursor-pointer hover:bg-blue-100 transition-colors duration-200">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open profile in new Tab
            </Button>
          </div>


          <div className={`relative mb-8 transform transition-all duration-500 ease-out ${
            isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ 
            transitionDelay: isOpen ? "250ms" : "0ms",
            willChange: 'transform, opacity'
          }}
          >
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-6 border border-blue-300 transition-all duration-300">
              <video src="./Animated Gradient.mp4" autoPlay loop muted className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className={`absolute -bottom-12 left-6 transform transition-all duration-600 ease-out ${
              isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-12"
            }`} 
            style={{ 
              transitionDelay: isOpen ? "400ms" : "0ms",
              willChange: 'transform, opacity'
            }}
            >
              <Avatar className="w-24 h-24 border-4 border-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {mentor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className={`flex justify-end space-x-2 mt-4 transform transition-all duration-500 ease-out ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ 
              transitionDelay: isOpen ? "500ms" : "0ms",
              willChange: 'transform, opacity'
            }}
            >
              <Button variant="outline" size="sm" className="cursor-pointer  transition-colors">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="cursor-pointer transition-colors">
                Ask a Question
              </Button>
              <Button variant="outline" size="sm" className="cursor-pointer transition-colors">
                View Pricing
              </Button>
            </div>
          </div>


          <div className={`mt-16 mb-6 transform transition-all duration-600 ease-out ${
            isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
          }`}
          style={{ 
            transitionDelay: isOpen ? "300ms" : "0ms",
            willChange: 'transform, opacity'
          }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">
                {mentor.name}
              </h1>
            </div>

            <p className="text-lg  mb-2 font-medium">
              {mentor.title} at {mentor.company}
            </p>

            <div className="flex items-center text-sm  mb-4">
              <span className="font-medium">{mentor.experience}</span>
              <Separator orientation="vertical" className="mx-2 h-4 bg-blue-300" />
              <MapPin className="w-4 h-4 mr-1" />
              {mentor.location}
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <p className=" text-sm leading-relaxed">
                {mentor.bio} I have experience in guiding students through their career journey and helping them achieve
                their goals with personalized roadmaps and resources.
              </p>
            </div>


            <div className={`flex items-center space-x-6 mb-6 transform transition-all duration-600 ease-out ${
              isOpen ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-6 scale-95"
            }`}
            style={{ 
              transitionDelay: isOpen ? "400ms" : "0ms",
              willChange: 'transform, opacity'
            }}
            >
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-2" />
                <span className="font-medium">{mentor.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">(92 Reviews)</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                62235+ Mentoring Mins
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                {mentor.mentees}+ Mentees
              </div>
            </div>


            <div className={`mb-6 transform transition-all duration-600 ease-out ${
              isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            }`}
            style={{ 
              transitionDelay: isOpen ? "500ms" : "0ms",
              willChange: 'transform, opacity'
            }}
            >
              <h3 className="font-semibold text-blue-900 mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    className={`text-sm bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 transform transition-all duration-400 ease-out cursor-pointer ${
                      isOpen ? "opacity-100 translate-y-0 scale-100 rotate-0" : "opacity-0 translate-y-3 scale-75 rotate-3"
                    }`}
                    style={{ 
                      transitionDelay: isOpen ? `${600 + index * 75}ms` : "0ms",
                      willChange: 'transform, opacity'
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>


            <div className={`mb-6 transform transition-all duration-600 ease-out ${
              isOpen ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-6 scale-95"
            }`}
            style={{ 
              transitionDelay: isOpen ? "700ms" : "0ms",
              willChange: 'transform, opacity'
            }}
            >
              <h3 className="font-semibold mb-3">Education</h3>
              <div className="flex items-center space-x-3">
                <div>
                  <p className="font-medium">Indian Institute of Technology</p>
                  <p className="text-sm ">Computer Science & Engineering</p>
                </div>
              </div>
            </div>
          </div>


          <div className={`mb-8 transform transition-all duration-700 ease-out ${
            isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ 
            transitionDelay: isOpen ? "600ms" : "0ms",
            willChange: 'transform, opacity'
          }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-900">Available Dates</h3>
              <Badge variant="outline" className="text-xs border-blue-300 ">
                Recommended
              </Badge>
            </div>

            <div className={`text-black rounded-lg p-4 mb-4 shadow-sm transform transition-all duration-600 ease-out ${
              isOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-1"
            }`}
            style={{ 
              transitionDelay: isOpen ? "700ms" : "0ms",
              willChange: 'transform, opacity'
            }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-black-100">Starting at</p>
                  <p className="text-2xl font-bold text-black">
                    ₹{mentor.price.toLocaleString()}
                    <span className="text-sm font-normal">/month</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="w-3 h-3 bg-green-400 rounded-full inline-block mr-2"></div>
                  <span className="text-sm text-black-100">Available Tue Sep 23 2025</span>
                </div>
              </div>
            </div>

            <div className={`flex space-x-3 transition-all duration-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isOpen ? "1200ms" : "0ms" }}
            >
              <Button variant="outline" className="cursor-pointer flex-1 bg-transparent border-blue-300  hover:bg-blue-50 hover:border-blue-400 transition-colors">
                View LTM Plans
              </Button>
              <Button className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm">
                Book a FREE Trial Session →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
