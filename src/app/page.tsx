"use client";
import React from "react";
// Use next/navigation if you are in the App Directory (or client component)
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // After a successful logout, redirect to the login page
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleLogout}
        style={{ padding: "1rem 2rem", fontSize: "1rem" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
