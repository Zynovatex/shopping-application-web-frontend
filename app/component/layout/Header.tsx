"use client";

import { useEffect, useState } from "react";
import HeaderGuest from "@/app/component/layout/HeaderGuest";
import HeaderUser from "@/app/component/layout/HeaderUser";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Example: check token in localStorage (adjust if using cookies)
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn ? <HeaderUser /> : <HeaderGuest />;
};

export default Header;
