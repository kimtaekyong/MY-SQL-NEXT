// app/api/login/route.js
import pool from "../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and password are required" }), { status: 400 });
    }

    // 이메일로 사용자 검색
    const [rows] = await pool.query("SELECT * FROM login WHERE USER_EMAIL = ?", [email]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    const user = rows[0];

    // 비밀번호 해시 비교
    const isMatch = await bcrypt.compare(password, user.USER_PASSWORD);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    // 로그인 성공
    return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
