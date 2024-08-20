// components/RegisterForm.js
"use client";

import React, { useState } from "react";

export default function RegisterForm() {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, name, email, phone, address, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setNickname("");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("");

        // 회원가입 성공 시 /login 페이지로 이동
        window.location.href = "/login"; // 성공 시 이동할 페이지
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <>
      <h2 className="mb-8 text-2xl font-bold">회원가입</h2>
      <form onSubmit={handleSubmit} className="text-[#1f1f1f] flex items-center flex-col gap-2">
        <div className="flex gap-x-3">
          <input
            className="text-[#1f1f1f] py-4 px-4 h-48px"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Nickname"
            required
          />
          <input
            className="text-[#1f1f1f] py-4 px-4 h-48px"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="flex gap-x-3">
          <input
            className="text-[#1f1f1f] py-4 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="text-[#1f1f1f] py-4 px-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
        </div>
        <div className="flex gap-x-3">
          <input
            className="text-[#1f1f1f] py-4 px-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <input
            className="text-[#1f1f1f] py-4 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
        </div>
        <button type="submit" className="bg-purple w-full h-[60px] px-10 text-[#fff]">
          회원가입
        </button>
        {(success || error) && (
          <p className={success ? "text-green-500" : "text-red-500"}>{success ? success : error}</p>
        )}
      </form>
    </>
  );
}
