"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react"; // ✅ Import icons
import Link from "next/link";

// ✅ Props type
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function ProfileMenu1({ open, setOpen }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md z-10">
          <ul className="py-2 text-sm text-gray-700">
            {/* Login */}
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => router.push("/auth/login")}
            >
              <LogIn size={16} />
              <Link href="/auth/login">Login</Link>
            </li>
            {/* Register */}
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => router.push("/auth/register")}
            >
              <LogIn size={16} />
              <Link href="/auth/register">Register</Link>
            </li>

            {/* Sign up
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => router.push('/signup')}
            >
              <UserPlus size={16} />
              Sign up
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
}
