"use client";

import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState(""); // 사용자 이름 상태
  const [email, setEmail] = useState(""); // 사용자 이메일 상태
  const [error, setError] = useState(""); // 에러 메시지 상태
  const [success, setSuccess] = useState(""); // 성공 메시지 상태

  useEffect(() => {
    // API 호출하여 사용자 데이터 가져오기
    async function fetchData() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }

    fetchData();
  }, []);

  // 폼 제출 핸들러
  async function handleSubmit(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 서버에 사용자 데이터 저장 요청
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }), // 요청 본문에 사용자 데이터 포함
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.json();
      setSuccess(result.message); // 성공 메시지 설정
      setName(""); // 이름 입력 필드 초기화
      setEmail(""); // 이메일 입력 필드 초기화

      // 데이터 새로고침
      const updatedUsersResponse = await fetch("/api/user");
      const updatedUsers = await updatedUsersResponse.json();
      setUsers(updatedUsers);
    } catch (error) {
      setError(error.message); // 에러 메시지 설정
    }
  }

  return (
    <div className="text-center">
      {/* 사용자 추가 폼 */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name">Name:</label>
          <input
            className="text-[#1f1f1f] p-4"
            id="USER_NAME"
            type="text"
            placeholder="이름을 작성해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="text-[#1f1f1f] p-4"
            id="eamil"
            placeholder="메일을 작성해주세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      {/* 성공 메시지 표시 */}
      {success && <p className="text-green-500">{success}</p>}
      {/* 에러 메시지 표시 */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
