"use client";

import React, { useState, useEffect } from "react";

export default function StickyWrapper({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    // Check scroll position on initial render
    setIsScrolled(window.scrollY > 70);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-black bg-opacity-50 shadow-md transform translate-y-0 opacity-100"
          : "bg-transparent transform translate-y-0 opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
