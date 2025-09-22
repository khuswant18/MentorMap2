"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, X, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function EditProfileModal({ open, onOpenChange }) {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    bio: "Experienced software engineer with 5+ years in full-stack development. Passionate about mentoring and helping others grow in their tech careers.",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    availability: "weekdays",
  })

  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSave = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information to help mentees learn more about you.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Photo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="font-medium">Profile Photo</h3>
              <p className="text-sm text-muted-foreground">Upload a professional photo to help mentees recognize you</p>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell mentees about your background and expertise..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">{profileData.bio.length}/500 characters</p>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Label>Skills & Expertise</Label>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select
              value={profileData.availability}
              onValueChange={(value) => setProfileData((prev) => ({ ...prev, availability: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays">Weekdays only</SelectItem>
                <SelectItem value="weekends">Weekends only</SelectItem>
                <SelectItem value="flexible">Flexible schedule</SelectItem>
                <SelectItem value="evenings">Evenings only</SelectItem>
                <SelectItem value="mornings">Mornings only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
