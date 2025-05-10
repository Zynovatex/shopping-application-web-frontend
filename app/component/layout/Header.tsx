'use client';

import { useEffect, useState } from 'react';
import HeaderGuest from './HeaderGuest';
import HeaderUser from './HeaderUser';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Example: check token in localStorage (adjust if using cookies)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn ? <HeaderUser /> : <HeaderGuest />;
};

export default Header;
