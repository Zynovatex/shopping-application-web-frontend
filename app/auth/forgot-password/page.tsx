"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // using next/navigation for client components
import { requestOtp } from "@/app/api/auth/authantication";

const RequestOTP = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const result = await requestOtp({ email });
      setMessage("OTP sent to your email.");
      setError(null);
      console.log("Request OTP result:", result);
      // Automatically redirect to the OTP verification page after a short delay.
      setTimeout(() => {
        router.push("/auth/verify-otp");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP.");
      setMessage(null);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Request OTP</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleRequestOTP}>
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
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Request OTP
        </button>
      </form>
    </div>
  );
};

export default RequestOTP;
