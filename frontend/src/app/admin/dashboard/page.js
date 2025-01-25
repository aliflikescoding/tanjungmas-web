"use client";

import React, { useEffect, useState } from "react";

const Admin = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify the token here
      console.log("Token found:", token);
      // Add your token verification logic here
      setMessage("Admin");
    } else {
      console.log("No token found");
      setMessage("Please log in");
    }
  }, []);

  return <div>{message}</div>;
};

export default Admin;
