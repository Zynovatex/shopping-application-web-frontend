"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  uploadProfilePicture,
  updateProfile,
  getUserProfile,
  DisplayProfileData,
} from "@/app/api/auth/profileApi"; // adjust path if needed

export default function ProfilePage() {
  // Profile states
  const [name, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [profilePic, setProfilePic] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  // Edit mode states
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  // File input ref and selected file state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Get auth token safely (client only)
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken") ?? ""
      : "";

  // Fetch profile data once on mount
  useEffect(() => {
    async function fetchProfile() {
      if (!token) return;
      try {
        const data: DisplayProfileData = await getUserProfile(token);
        // Update state with fetched data
        setFullName(data.name);
        setEmail(data.email);
        setProfilePic(
          data.profilePictureUrl ?? "https://i.pravatar.cc/150?img=12"
        );
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    }
    fetchProfile();
  }, [token]);

  // Handle file selection and preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open hidden file input on icon click
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Submit handler uploads picture (if changed) and updates profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let profilePictureUrl = profilePic;

      // Upload new picture if selected
      if (selectedFile) {
        profilePictureUrl = await uploadProfilePicture(selectedFile);
      }

      // Call your existing updateProfile API (no changes needed here)
      const response = await updateProfile({
        name,
        email,
        profilePictureUrl,
      });

      console.log("Profile updated", response);

      // Exit edit modes and reset file selection
      setEditName(false);
      setEditEmail(false);
      setSelectedFile(null);

      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <section className="max-w-5xl mx-auto">
      {/* Profile Picture with edit icon */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        
        <button
          type="button"
          onClick={openFilePicker}
          className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
          aria-label="Change profile picture"
        >
          {/* Pencil icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
            />
          </svg>
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        {/* Full Name Field */}
        <div className="relative">
          <label className="block mb-1 font-medium">Full Name</label>

          {editName ? (
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={name}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoFocus
              onBlur={() => setEditName(false)}
            />
          ) : (
            <div className="flex items-center justify-between border border-gray-300 rounded p-2 bg-gray-50">
              <span>{name}</span>
              <button
                type="button"
                onClick={() => setEditName(true)}
                aria-label="Edit Full Name"
                className="ml-2 text-teal-600 hover:text-teal-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <label className="block mb-1 font-medium">Email</label>

          {editEmail ? (
            <input
              type="email"
              className="w-full border border-gray-300 rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              onBlur={() => setEditEmail(false)}
            />
          ) : (
            <div className="flex items-center justify-between border border-gray-300 rounded p-2 bg-gray-50">
              <span>{email}</span>
              <button
                type="button"
                onClick={() => setEditEmail(true)}
                aria-label="Edit Email"
                className="ml-2 text-teal-600 hover:text-teal-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
