"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut } from "lucide-react";
import { fetchUserProfile } from "@/app/api/auth/profileApi"; // adjust path

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // State for profile picture URL
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  // Get token (client side only)
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken") ?? ""
      : "";

  // Fetch profile picture on mount
  useEffect(() => {
    async function loadProfile() {
      if (!token) return;
      try {
        const data = await fetchUserProfile(token);
        setProfilePicUrl(data.profilePictureUrl || null);
      } catch (error) {
        console.error("Failed to load profile picture", error);
        setProfilePicUrl(null);
      }
    }
    loadProfile();
  }, [token]);

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Image */}
      <div
        className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        
        {profilePicUrl ? (
          <Image
            src={profilePicUrl}
            alt="Profile"
            width={32}
            height={32}
            className="object-cover"
          />
        ) : (
          // Fallback static image if no profile pic
          <Image
            src="/shopOwner/owner1.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="object-cover"
          />
        )}
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md z-10">
          <ul className="py-2 text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => router.push("/pages/userProfile")}
            >
              <User size={16} /> View Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => router.push("/pages/setting")}
            >
              <Settings size={16} /> Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
              
                localStorage.removeItem("authToken");
                setOpen(false);
                window.location.href = "/";
              }}
            >
              <LogOut size={16} />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}