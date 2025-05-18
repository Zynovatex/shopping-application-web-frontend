/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { LoginData, loginUser } from "@/app/api/auth/authantication";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: LoginData = { email, password };

    try {
      const result = await loginUser(loginData);
      const token = result;
      localStorage.setItem("authToken", token);

      setSuccessMessage("Login successful!");
      setError(null);
      console.log("Login result:", result);

      //  NEW: Full reload to “/” so HeaderGuest logic runs
      window.location.href = "/";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      setSuccessMessage(null);
    }
  };

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="hidden md:block md:w-1/2">
          
          <img
            src="/loginIllustrater.png"
            alt="Login Illustration"
            className="mt-[102px] ml-[173px]"
            width={688}
            height={512}
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md pr-10">
            <h1 className="text-3xl font-bold mb-6">LogIn</h1>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-[#5A31F5]"
                >
                  Email Address
                </label>
                <div className="h-14 relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-full w-full p-2 border border-gray-300 rounded-xl"
                    placeholder="you@example.com"
                  />
                  {email && isValidEmail(email) && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="black" />
                        <path
                          d="M9.5 13.7l-2.2-2.2-.9.9 3.1 3.1 6.1-6.1-.9-.9z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium"
                >
                  Password
                </label>
                <div className="h-14">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-full w-full p-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  href="/auth/register"
                  className="text-[#000000] hover:underline"
                >
                  Sign Up Now
                </Link>
                <Link
                  href="/auth/forgot-password"
                  className="text-[#000000] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="h-14 flex gap-4">
                <button
                  type="submit"
                  className="h-full w-full px-4 py-2 bg-[#5A31F5] text-white rounded-xl"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="text-center text-sm mt-4 mb-4">Or Login with</div>
            <div className="h-23 mt-3 flex justify-between">
              <button className="flex items-center justify-center px-10 py-5 bg-white text-black rounded-xl border">
                <Image src="/Apple.png" alt="Apple" width={25} height={25} />
              </button>
              <button className="flex items-center justify-center px-10 py-5 bg-white text-black rounded-xl border">
                <Image src="/Google.png" alt="Google" width={25} height={25} />
              </button>
              <button className="flex items-center justify-center px-10 py-5 bg-white text-black rounded-xl border">
                <Image
                  src="/Facebook.png"
                  alt="Facebook"
                  width={25}
                  height={25}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}