"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/app/api/public.js'; // Adjust the import path as necessary

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await auth();
      setIsAuthenticated(authenticated);
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Or redirect to a login page
  }

  return (
    <div className="admin-layout">
      <header>
        <h1>Admin Panel</h1>
        {/* Add a navigation bar or admin-specific links */}
      </header>
      <main>{children}</main>
    </div>
  );
}
