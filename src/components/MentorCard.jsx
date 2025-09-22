"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export function MentorCard({ mentor, onBookTrial }) {
  const navigate = useNavigate();
  
  const Indipage = () => {
    navigate(`/profile/${mentor.id}`); 
  };

  const handleReadMore = () => {
    onBookTrial(mentor);
  }; 
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Card className="h-[380px] w-full hover:shadow-2xl transition-all duration-300 border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/20 backdrop-blur-sm">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start space-x-4 mb-4 h-[80px]">
          <Avatar className="w-16 h-16 cursor-pointer hover:scale-105 transition-transform ring-2 ring-blue-100 hover:ring-blue-200 shrink-0">
            <AvatarImage
              src={mentor.image || "/placeholder.svg"}
              alt={mentor.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-sm">
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")} 
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 overflow-hidden">
            <h3 className="font-bold text-lg text-gray-900 font-[family-name:var(--font-playfair)] cursor-pointer hover:text-blue-700 transition-colors leading-tight line-clamp-1">
              {mentor.name}
            </h3>
            <p className="text-sm font-semibold text-gray-700 line-clamp-1 mb-1">{truncateText(mentor.title, 25)}</p>
            <div className="flex items-center text-xs text-gray-600">
              <Briefcase className="w-3 h-3 mr-1 text-blue-500 shrink-0" />
              <span className="font-medium line-clamp-1">{truncateText(mentor.company, 20)}</span>
            </div>
            <div className="mt-1">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                {mentor.experience}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 h-[60px] overflow-hidden">
          <div className="text-sm text-gray-600 leading-relaxed">
            <p className="line-clamp-3">
              {mentor.bio}
            </p>
            {mentor.bio && mentor.bio.length > 100 && (
              <button 
                onClick={handleReadMore}
                className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs font-medium mt-1 transition-colors hover:underline"
              >
                Read more...
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4 h-[70px] overflow-hidden">
          {mentor.skills.slice(0, 4).map((skill) => (
            <Badge
              key={skill}
              className="text-xs px-2 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all cursor-pointer font-medium h-fit"
            >
              {skill}
            </Badge>
          ))}
          {mentor.skills.length > 4 && (
            <button
              onClick={handleReadMore}
              className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-semibold transition-all bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-full border border-blue-200 hover:border-blue-300 h-fit"
            >
              +{mentor.skills.length - 4}
            </button>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex gap-2">
            <Button
              onClick={Indipage}
              variant="outline"
              className="cursor-pointer flex-1 h-9 bg-transparent border border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all font-medium text-xs"
            >
              View Profile
            </Button>
            <Button
              onClick={() => onBookTrial(mentor)}
              className="cursor-pointer flex-1 h-9 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all shadow-sm hover:shadow-md font-medium text-xs"
            >
              Book Trial
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
