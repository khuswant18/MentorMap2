"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MentorCard } from "@/components/MentorCard";
import { MentorSidebar } from "@/components/MentorSidebar";
import { mentorsData } from "./data/mentor";

import { AnimatePresence, motion } from "framer-motion";

export default function HomePage() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBookTrial = (mentor) => {  
    setSelectedMentor(mentor);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedMentor(null);
  };

  const filteredMentors = useMemo(() => {
    if (!searchTerm.trim()) {
      return mentorsData;
    }

    const searchLower = searchTerm.toLowerCase();
    return mentorsData.filter((mentor) => {
      return (
        mentor.name.toLowerCase().includes(searchLower) ||
        mentor.title.toLowerCase().includes(searchLower) ||
        mentor.company.toLowerCase().includes(searchLower) ||
        mentor.bio.toLowerCase().includes(searchLower) ||
        mentor.skills.some((skill) => skill.toLowerCase().includes(searchLower))
      );
    });
  }, [searchTerm]);

  return (
    <div className="mt-[6rem] min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Find Your Perfect Mentor
          </h1>
          <p className="text-lg max-w-2xl">
            Connect with experienced college students who can guide you through
            your academic and career journey.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative max-w-md flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search mentors by name, skills, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white shadow-sm"
              />
            </div>
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mb-4">
              {filteredMentors.length} mentor
              {filteredMentors.length !== 1 ? "s" : ""} found for "{searchTerm}"
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="w-full h-[380px] cursor-pointer transform transition-transform duration-200 hover:scale-105"
            >
              <MentorCard
                mentor={mentor}
                onBookTrial={() => handleBookTrial(mentor)}
              />
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && searchTerm && (
          <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-lg mb-2 font-semibold">
              No mentors found for "{searchTerm}"
            </p>
            <p className="text-sm"> 
              Try searching with different keywords or browse all mentors
            </p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {isSidebarOpen && selectedMentor && (
          <motion.div
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-[400px] bg-white z-50"
          >
            <MentorSidebar
              mentor={selectedMentor} 
              isOpen={isSidebarOpen}
              onClose={closeSidebar}
            />
          </motion.div>


        )}
      </AnimatePresence>
    </div>
  );
}
