"use client";

import { useState } from "react";
import { X, Camera, Plus } from "lucide-react";

export default function EditProfileModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "Khuswant Rajpurohit",
    bio: "Experienced software engineer with 5+ years in full-stack development. Passionate about mentoring and helping others grow in their tech careers.",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    availability: "weekdays",
    hourlyRate: "50",
  });

  const [newSkill, setNewSkill] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dashboard-modal-overlay">
      <div className="dashboard-modal max-w-2xl">
        <div className="dashboard-modal-header">
          <div className="flex items-center justify-between">
            <h2 className="dashboard-modal-title">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--dashboard-muted)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="dashboard-modal-content space-y-6"
        >
          <div className="text-center">
            <div className="relative inline-block">
              <div className="dashboard-avatar-large mb-4">
                <span>K</span>
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-[var(--dashboard-primary)] text-[var(--dashboard-primary-foreground)] rounded-full hover:bg-[var(--dashboard-primary)]/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-[var(--dashboard-muted-foreground)]">
              Click the camera icon to update your profile photo
            </p>
          </div>

          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="dashboard-form-input"
              required
            />
          </div>

          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Bio *</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="dashboard-form-textarea"
              rows={4}
              placeholder="Tell mentees about your experience and expertise..."
              required
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-[var(--dashboard-muted-foreground)]">
                Describe your background and what you can help with
              </span>
              <span className="text-xs text-[var(--dashboard-muted-foreground)]">
                {formData.bio.length}/1000
              </span>
            </div>
          </div>

          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Skills & Expertise *</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--dashboard-primary)]/10 text-[var(--dashboard-primary)] rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-[var(--dashboard-primary)]/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill())
                }
                className="dashboard-form-input flex-1"
                placeholder="Add a skill..."
              />
              <button
                type="button"
                onClick={addSkill}
                className="dashboard-button dashboard-button-secondary px-3"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Availability *</label>
            <select
              value={formData.availability}
              onChange={(e) =>
                handleInputChange("availability", e.target.value)
              }
              className="dashboard-form-input"
              required
            >
              <option value="weekdays">Weekdays (Mon-Fri)</option>
              <option value="weekends">Weekends (Sat-Sun)</option>
              <option value="flexible">Flexible (Any day)</option>
              <option value="custom">Custom schedule</option>
            </select>
          </div>

          <div className="dashboard-form-group">
            <label className="dashboard-form-label">Hourly Rate (USD) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--dashboard-muted-foreground)]">
                $
              </span>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) =>
                  handleInputChange("hourlyRate", e.target.value)
                }
                className="dashboard-form-input pl-8"
                min="1"
                required
              />
            </div>
            <p className="text-xs text-[var(--dashboard-muted-foreground)] mt-1">
              Set your hourly rate for mentoring sessions
            </p>
          </div>
        </form>

        <div className="dashboard-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="dashboard-button dashboard-button-ghost"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="dashboard-button dashboard-button-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
