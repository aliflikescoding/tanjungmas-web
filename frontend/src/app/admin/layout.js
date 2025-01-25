"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/app/api/public.js'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await auth();
      if (!authenticated) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
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
