"use client";

import React, { useState, useEffect } from "react";

export default function StickyWrapper({ children, onScrollChange }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 70;
      setIsScrolled(scrolled);
      if (onScrollChange) onScrollChange(scrolled);
    };

    handleScroll(); // Check initial scroll position

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollChange]);

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-black bg-opacity-50 shadow-md" : "bg-transparent"
      }`}
    >
      {children}
    </div>
  );
}
