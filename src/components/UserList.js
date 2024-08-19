"use client";

import { useEffect, useState } from "react";

export default function USER_LIST() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // API 호출하여 사용자 데이터 가져오기
    async function fetchData() {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data);
    }

    fetchData();
  }, []);

  return (
    <div className="text-center">
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.USER_NAME} - {user.USER_EMAIL}
          </li>
        ))}
      </ul>
    </div>
  );
}
