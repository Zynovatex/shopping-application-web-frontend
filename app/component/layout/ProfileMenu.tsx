"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
        <Image
          src="/shopOwner/owner1.jpg" // ✅ Replace with your actual profile image path
          alt="Profile"
          width={32}
          height={32}
          className="object-cover"
        />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md z-10">
          <ul className="py-2 text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => router.push("/profile")}
            >
              <User size={16} /> View Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => router.push("/settings")}
            >
              <Settings size={16} /> Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
                localStorage.removeItem("token"); // 🔐 Remove login token
                setOpen(false); // 🔒 Close dropdown
                window.location.href = "/pages/landingpage"; // 🏠 Go to home (refresh triggers HeaderGuest)
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
