import React from "react";
import Link from "next/link";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">HOME</h1>
      <Link href="/auth/login">
        <button className="px-6 py-3 mb-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
          Login
        </button>
      </Link>
      <Link href="/shop-registrations">
        <button className="px-6 py-3 mb-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
          Register Shop
        </button>
      </Link>
      <Link href="/productpage/3">
        <button className="px-6 py-3 mb-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
          Product Page
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
