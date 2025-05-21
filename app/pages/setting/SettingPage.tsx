/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import SidebarMenu from "@/app/component/layout/ProfileSettingSideBar";

const SettingsPage: React.FC = () => {
  // Profile state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fullName, setFullName] = useState("John Doe");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState("john.doe@example.com");

  // Security state
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

  // Notifications state
//   const [emailNotifications, setEmailNotifications] = useState(true);
//   const [smsNotifications, setSmsNotifications] = useState(false);

  // Handlers
//   const handleProfileSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // TODO: call update profile API
//     console.log({ fullName, email });
//   };

//   const handlePasswordSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // TODO: call change password API
//     console.log({ currentPassword, newPassword, confirmPassword });
//   };

//   const handleNotificationsSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // TODO: call update notification prefs API
//     console.log({ emailNotifications, smsNotifications });
//   };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-6">
      {/* Sidebar Navigation */}
      <SidebarMenu></SidebarMenu>

      {/* Main Content Area */}
      <div className="md:w-3/4 md:pl-6 flex flex-col items-center">
        {/* Profile Picture Centered on Top */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover mb-4 border-4 border-blue-600"
          />
          <h1 className="text-xl font-semibold">John Doe</h1>
        </div>

        <main className="w-full space-y-8">
          {/* Profile Section */}
          <section id="profile">
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="text-lg font-medium text-gray-900">{fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-medium text-gray-900">{email}</p>
              </div>
            </div>
          </section>
       </main>
      </div>
    </div>
  );
};

export default SettingsPage;