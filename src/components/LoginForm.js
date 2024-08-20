// components/LoginForm.js
"use client";

import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        // 로그인 성공 후 리디렉션
        window.location.href = "/dashboard"; // 성공 시 이동할 페이지
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-y-2 mb-2">
        <input
          className="text-[#1f1f1f] py-4 px-4 h-48px"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          className="text-[#1f1f1f] py-4 px-4 h-48px"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />
      </div>
      <button type="submit" className="bg-purple w-full h-[60px]">
        Login
      </button>
      {(success || error) && <p className={success ? "text-green-500" : "text-red-500"}>{success ? success : error}</p>}
    </form>
  );
}
