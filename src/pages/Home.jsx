"use client";

import {
  ArrowRight,
  Users,
  MapPin,
  GraduationCap,
  Award,
  MessageCircle,
} from "lucide-react";
import { RetroGrid } from "@/components/ui/retro-grid";
import { useEffect } from "react";
import useCollegeStore from "@/stores/college.store";
import { mentorsData } from "./data/mentor";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const {colleges,fetchColleges,loading} = useCollegeStore()
  const navigate = useNavigate() 
  const {isAuthenticated} = useAuthStore()
  const featuredMentors = mentorsData.slice(0, 3);

  useEffect(() => {
  fetch(import.meta.env.VITE_API_URL + "/ping")
    .then(res => res.text())
    .then(console.log)
    .catch(console.error)
}, [])
  
  useEffect(()=>{  
    fetchColleges() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) //

  if (loading) return <div>Loading...</div>

  const featuredColleges = colleges.slice(0, 6);

  const handleConnectClick = () => {
    setTimeout(() => {
      {isAuthenticated ? navigate('/mentorspage') : navigate('/')}
    }, 500);  
  }; 

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-black-50 via-black-50 to-black-100 py-20 sm:py-32">
        <RetroGrid className="absolute inset-0 z-0" />
        <div className="mt-[4rem] container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="text-balance">Connect Now with the Mentors</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Easily record and share AI-powered video messages with your
              teammates and customers to supercharge productivity
            </p>
            <div className="mt-10 flex items-center justify-center">
              <button
                className="cursor-pointer group flex items-center gap-2 px-6 py-3 bg-black text-white text-lg font-semibold rounded-2xl shadow-lg hover:bg-gray-900 transition"
                onClick={handleConnectClick}
              >
                Connect Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-8xl">
            <div className="relative rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-gray-900/10">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900 flex items-center justify-center">
                <video
                  src="/mentorVideo2.mp4"
                  autoPlay
                  loop
                  muted
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">Explore Top Colleges</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Connect with mentors from prestigious universities and get insider
              insights about campus life, academics, and admission processes
            </p>
          </div>

          <div className="cursor-pointer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {featuredColleges.map((college) => (
              <Card
                key={college.id}
                className="group hover:shadow-medium transition-all duration-300 bg-card-gradient border-0"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {college.mentorCount} mentors
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {college.name}
                    </h3>

                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{college.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {college.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{college.mentorCount} mentors available</span>
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="group/btn"
                      >
                        <Link to={`/mentors/${college.name}`}>     
                          View Mentors 
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">Talk to Top Mentors </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Connect with mentors from prestigious universities and get insider
              insights about campus life, academics, and admission processes
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMentors.map((m) => (
              <Card
                key={m.id}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl"
              >
                <CardContent className="p-6 flex flex-col h-full justify-between">
                  <div className="flex flex-col items-center">
                    <div className="text-center mb-4 relative h-28 w-28 rounded-full overflow-hidden mx-auto ring-4 ring-purple-100 group-hover:ring-purple-300 transition-all">
                      <img
                        src={m.image || "/placeholder.svg"}
                        alt={`${m.name} profile`}
                        className="h-full w-full object-cover object-top"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="h-2.5 w-2.5 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {m.name}
                    </h3>
                    <p className="text-sm text-purple-600 font-medium mb-1">
                      {m.branch}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">{m.year}</p>

                    <p className="text-sm text-gray-600 text-center mb-4 line-clamp-3">
                      {m.bio}
                    </p>

                    <div className="w-full space-y-3 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" /> Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {m.skills.slice(0, 2).map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {m.skills.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{m.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                          <Award className="h-4 w-4" /> Experience
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {m.experience.split(",").map((exp, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs break-words"
                            >
                              {exp.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white py-2 flex items-center justify-center gap-2 mt-auto">
                    <MessageCircle className="h-5 w-5" /> Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
 