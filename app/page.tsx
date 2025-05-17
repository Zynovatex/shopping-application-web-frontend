import React from "react";
import LandingPage from "./pages/landingpage/LandPage";


function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LandingPage></LandingPage>
      {/* <Link href="/auth/login">
        <button className="px-6 py-3 mb-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
          Login
        </button>
      </Link>
      <Link href="/shop-registrations">
        <button className="px-6 py-3 mb-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
          Register Shop
        </button>
      </Link>
      <Link href="/productpage/1">
        <button className="px-6 py-3 mb-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
          Product Page
        </button>
      </Link> */}
    </div>
  );
}

export default HomePage;