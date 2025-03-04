"use client";
import axios from "axios";
import React, { useState } from "react";
import { LoginData, loginUser } from "@/app/api/auth/authentication";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle login submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: LoginData = { email, password };

    try {
      const result = await loginUser(loginData);
      setSuccessMessage("Login successful!");
      setError(null);
      console.log("Login result:", result);
      // Redirect upon successful login
      router.push("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      setSuccessMessage(null);
    }
  };

  // Redirect to the Forgot Password page.
  const redirectToForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  // Optionally, a button to redirect to a registration page.
  const redirectToRegister = () => {
    router.push("/auth/register");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Login
          </button>
          <button
            type="button"
            style={{ padding: "0.5rem 1rem" }}
            onClick={redirectToForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </form>
      <div>
        <button
          type="button"
          style={{ padding: "0.5rem 1rem" }}
          onClick={redirectToRegister}
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
