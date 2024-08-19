import pool from "../../../lib/db";

// 사용자 데이터를 MySQL에 저장하는 API 라우트
export async function GET() {
  try {
    // MySQL에서 사용자 데이터를 조회
    const [rows] = await pool.query("SELECT * FROM USER_LIST");
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json(); // 요청 본문에서 사용자 데이터 추출

    if (!name || !email) {
      return new Response(JSON.stringify({ message: "Name and Email are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // MySQL 데이터베이스에 사용자 데이터 삽입
    await pool.query("INSERT INTO USER_LIST (USER_NAME, USER_EMAIL) VALUES (?, ?)", [name, email]);

    return new Response(JSON.stringify({ message: "전송성공" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
