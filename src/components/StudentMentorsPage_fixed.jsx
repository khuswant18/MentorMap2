"use client"

import { useState } from "react"
import { Search, Filter, Star, MapPin, Clock, Video, MessageCircle, Heart } from "lucide-react"

export default function StudentMentorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const mentors = [
    {
      id: 1,
      name: "John Smith",
      avatar: "JS",
      title: "Senior React Developer",
      company: "Google",
      location: "San Francisco, CA",
      rating: 4.9,
      reviews: 150,
      hourlyRate: 50,
      expertise: ["React", "JavaScript", "Node.js", "MongoDB"],
      experience: "5+ years",
      sessions: 200,
      responseTime: "Usually responds within 2 hours",
      isOnline: true,
      isFavorite: true,
      description: "I help developers master React and build scalable web applications. With 5+ years at Google, I've mentored 100+ developers."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "SJ",
      title: "Career Development Coach",
      company: "LinkedIn",
      location: "New York, NY",
      rating: 4.8,
      reviews: 200,
      hourlyRate: 40,
      expertise: ["Career Planning", "Interview Prep", "Resume Review", "Networking"],
      experience: "8+ years",
      sessions: 300,
      responseTime: "Usually responds within 1 hour",
      isOnline: true,
      isFavorite: false,
      description: "I help professionals navigate their career journey and land their dream jobs. Former recruiter at top tech companies."
    },
    {
      id: 3,
      name: "Mike Chen",
      avatar: "MC",
      title: "UX/UI Designer",
      company: "Facebook",
      location: "Seattle, WA",
      rating: 4.7,
      reviews: 80,
      hourlyRate: 60,
      expertise: ["UI Design", "UX Research", "Figma", "Design Systems"],
      experience: "6+ years",
      sessions: 120,
      responseTime: "Usually responds within 4 hours",
      isOnline: false,
      isFavorite: false,
      description: "I specialize in user-centered design and help designers create impactful digital experiences."
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "ED",
      title: "Product Manager",
      company: "Microsoft",
      location: "Austin, TX",
      rating: 4.9,
      reviews: 95,
      hourlyRate: 70,
      expertise: ["Product Strategy", "Data Analysis", "User Research", "Agile"],
      experience: "7+ years",
      sessions: 150,
      responseTime: "Usually responds within 3 hours",
      isOnline: true,
      isFavorite: true,
      description: "I help aspiring PMs develop strategic thinking and launch successful products."
    }
  ]

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "online") return matchesSearch && mentor.isOnline
    if (selectedFilter === "favorites") return matchesSearch && mentor.isFavorite
    
    return matchesSearch
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">My Mentors</h1>
          <p className="text-muted-foreground">
            Connect with your mentors and manage your relationships
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search mentors by name or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              selectedFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter("online")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              selectedFilter === "online"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setSelectedFilter("favorites")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              selectedFilter === "favorites"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {mentor.avatar}
                  </div>
                  {mentor.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-card-foreground">{mentor.name}</h3>
                    {mentor.isFavorite && (
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    )}
                  </div>
                  <p className="text-purple-600 font-medium">{mentor.title}</p>
                  <p className="text-sm text-muted-foreground">{mentor.company}</p>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {mentor.rating} ({mentor.reviews} reviews)
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-card-foreground">${mentor.hourlyRate}</div>
                <div className="text-sm text-muted-foreground">per hour</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {mentor.description}
            </p>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    +{mentor.expertise.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {mentor.responseTime}
              </div>
              <div className="text-right">
                {mentor.sessions}+ sessions completed
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium cursor-pointer">
                Book Session
              </button>
              <button className="px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <Video className="w-4 h-4" />
              </button>
              <button 
                className={`px-4 py-2 border rounded-lg transition-colors cursor-pointer ${
                  mentor.isFavorite 
                    ? "border-red-300 text-red-500 hover:bg-red-50" 
                    : "border-input hover:bg-accent"
                }`}
              >
                <Heart className={`w-4 h-4 ${mentor.isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            No mentors found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters to find mentors.
          </p>
          <button 
            onClick={() => {
              setSearchQuery("")
              setSelectedFilter("all")
            }}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}