"use client";

import { useEffect, useState } from "react";
import UserForm from "./UserForm"; // 분리된 폼 컴포넌트 임포트
import DeleteButton from "./DeleteButton";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState(""); // 사용자 이름 상태
  const [email, setEmail] = useState(""); // 사용자 이메일 상태
  const [error, setError] = useState(""); // 에러 메시지 상태
  const [success, setSuccess] = useState(""); // 성공 메시지 상태
  const [selectedUserId, setSelectedUserId] = useState(null); // 선택된 사용자 ID 상태

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

  // 클릭 시 유저 데이터 삭제 핸들러
  const handleDeleteSuccess = (deletedUserId) => {
    // 삭제된 사용자를 목록에서 제거
    setUsers(users.filter((user) => user.USER_ID !== deletedUserId));
  };

  // 클릭 시 사용자 ID를 설정하는 핸들러
  function handleUserClick(userId) {
    setSelectedUserId(userId);
  }

  return (
    <div className="text-center flex flex-col">
      {/* 사용자 추가 폼 */}
      <UserForm name={name} email={email} setName={setName} setEmail={setEmail} onSubmit={handleSubmit} />
      {(success || error) && <p className={success ? "text-green-500" : "text-red-500"}>{success ? success : error}</p>}

      <div className="flex justify-center gap-x-2">
        <a href="/login">로그인</a>
        <a href="/sign">회원가입</a>
      </div>
      {/* 사용자 목록 표시 */}
      <div style={{ display: "none" }}>
        <h2 className="text-xl mb-4">User List</h2>
        <ul className="list-disc list-inside">
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user.USER_ID}
                className="mb-2 cursor-pointer flex justify-between items-center text-xl gap-x-8"
                onClick={() => handleUserClick(user.USER_ID)}
              >
                {user.USER_NAME} ({user.USER_EMAIL})
                <DeleteButton
                  text="삭제"
                  userId={user.USER_ID}
                  apiEndpoint={"/api/user"}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </li>
            ))
          ) : (
            <p>No users found</p>
          )}
        </ul>

        {/* 선택된 사용자 ID 표시 */}
        {selectedUserId !== null && <p className="mt-4 text-blue-500">Selected User ID: {selectedUserId}</p>}
      </div>
    </div>
  );
}
