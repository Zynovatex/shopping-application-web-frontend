"use client";

import React, { useState, useEffect } from "react";
import SidebarMenu from "@/app/component/layout/ProfileSettingSideBar";
import { getUserProfile, DisplayProfileData } from "@/app/api/auth/profileApi"; // adjust path

const SettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<DisplayProfileData | null>(null);

  // Fetch token safely (client side only)
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken") ?? ""
      : "";

  useEffect(() => {
    async function fetchProfile() {
      if (!token) return;
      try {
        const data = await getUserProfile(token);
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    }
    fetchProfile();
  }, [token]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-6">
      {/* Main Content Area */}
      <div className="md:w-full md:pl-20 flex flex-col items-center">
        {/* Profile Picture Centered on Top */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src={
              profile.profilePictureUrl ?? "https://i.pravatar.cc/150?img=12"
            }
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover mb-4 border-4 border-blue-600"
          />
          <h1 className="text-xl font-semibold">{profile.name}</h1>
        </div>

        <main className="w-full space-y-8">
          {/* Profile Section */}
          <section id="profile">
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="text-lg font-medium text-gray-900">
                  {profile.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-medium text-gray-900">
                  {profile.email}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
