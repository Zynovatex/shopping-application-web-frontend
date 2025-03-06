"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPasswordWithOTP } from "@/app/api/auth/authantication";

const ResetPassword = () => {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Frontend validation: check that newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage(null);
      return;
    }

    // Ensure all fields are filled
    if (!email || !otp || !newPassword) {
      setError("All fields are required.");
      setMessage(null);
      return;
    }

    try {
      // Call the API function to reset the password using email, otp, and newPassword
      await resetPasswordWithOTP({ email, otp, newPassword });
      setMessage("Password reset successful. You can now log in.");
      setError(null);
      // Optionally redirect to the login page after a short delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password.");
      setMessage(null);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Reset Password</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Confirm Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
