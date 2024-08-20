// app/api/register/route.js
import pool from "../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { nickname, name, email, phone, address, password } = await request.json();

    if (!nickname || !name || !email || !phone || !address || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    // 비밀번호 해시 생성
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 사용자 데이터베이스에 저장
    await pool.query(
      "INSERT INTO LOGIN (USER_NICKNAME, USER_NAME, USER_EMAIL, USER_PHONE, USER_ADDRESS, USER_PASSWORD) VALUES (?, ?, ?, ?, ?, ?)",
      [nickname, name, email, phone, address, hashedPassword]
    );

    return new Response(JSON.stringify({ message: "Registration successful" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
