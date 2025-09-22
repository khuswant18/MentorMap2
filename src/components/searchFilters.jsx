"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const skillOptions = [
  "ReactJS",
  "JavaScript",
  "Python",
  "Java",
  "Node.js",
  "TypeScript",
  "HTML",
  "CSS",
  "DSA",
  "System Design",
  "Frontend Architecture",
  "Leadership & Communication",
  "React",
  "Angular",
  "Vue.js",
]

const experienceOptions = [
  { value: "all", label: "All Experience" },
  { value: "1-2", label: "1-2 years" },
  { value: "2-4", label: "2-4 years" },
  { value: "4-6", label: "4-6 years" },
  { value: "6+", label: "6+ years" },
]

const priceRangeOptions = [
  { value: "all", label: "All Prices" },
  { value: "0-10000", label: "Under ₹10,000" },
  { value: "10000-15000", label: "₹10,000 - ₹15,000" },
  { value: "15000-20000", label: "₹15,000 - ₹20,000" },
  { value: "20000+", label: "Above ₹20,000" },
]

const targetAudienceOptions = [
  { value: "all", label: "All Levels" },
  { value: "fresher", label: "Fresher" },
  { value: "experienced", label: "Experienced Professional" },
  { value: "student", label: "Student" },
]

export function SearchFilters({ onSearchChange, onFiltersChange }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    experience: "all",
    priceRange: "all",
    skills: [],
    targetAudience: "all",
  })

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    onSearchChange(value)
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const addSkill = (skill) => {
    if (!filters.skills.includes(skill)) {
      handleFilterChange("skills", [...filters.skills, skill])
    }
  }

  const removeSkill = (skill) => {
    handleFilterChange(
      "skills",
      filters.skills.filter((s) => s !== skill),
    )
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      experience: "all",
      priceRange: "all",
      skills: [],
      targetAudience: "all",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters =
    filters.experience !== "all" ||
    filters.priceRange !== "all" ||
    filters.skills.length > 0 ||
    filters.targetAudience !== "all"

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
        <Input
          placeholder="Search by name, skill, domain, or company..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-4 py-3 text-base border-blue-200 focus:border-blue-400 focus:ring-blue-400"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)} 
          className="cursor-pointer flex items-center gap-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 border-blue-200">
              {filters.skills.length +
                (filters.experience !== "all" ? 1 : 0) +
                (filters.priceRange !== "all" ? 1 : 0) +
                (filters.targetAudience !== "all" ? 1 : 0)}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            onClick={clearAllFilters} 
            className="cursor-pointer text-sm text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-4 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Experience Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block text-blue-900">Experience</label>
              <Select value={filters.experience} onValueChange={(value) => handleFilterChange("experience", value)}>
                <SelectTrigger className="cursor-pointer border-blue-200 hover:border-blue-300 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block text-blue-900">Price Range</label>
              <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
                <SelectTrigger className="cursor-pointer border-blue-200 hover:border-blue-300 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target Audience Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block text-blue-900">Target Audience</label>
              <Select
                value={filters.targetAudience}
                onValueChange={(value) => handleFilterChange("targetAudience", value)}
              >
                <SelectTrigger className="cursor-pointer border-blue-200 hover:border-blue-300 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {targetAudienceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Skills Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block text-blue-900">Skills</label>
            <div className="space-y-2">
              <Select onValueChange={addSkill}>
                <SelectTrigger className="cursor-pointer border-blue-200 hover:border-blue-300 transition-colors">
                  <SelectValue placeholder="Add skills..." />
                </SelectTrigger>
                <SelectContent>
                  {skillOptions
                    .filter((skill) => !filters.skills.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill} className="cursor-pointer">
                        {skill}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {filters.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.skills.map((skill) => (
                    <Badge key={skill} className="flex items-center gap-1 bg-blue-100 text-blue-800 border-blue-200">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer hover:text-red-600 transition-colors" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
