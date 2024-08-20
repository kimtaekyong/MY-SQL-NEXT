import pool from "../../../lib/db";

// 사용자 데이터를 MySQL에 저장하는 API 라우트
export async function GET() {
  try {
    // MySQL에서 사용자 데이터를 조회
    const [rows] = await pool.query("SELECT * FROM USER_LIST");
    return new Response(JSON.stringify(rows), {
      status: 200, // 데이터 조회 성공
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500, // 서버 내부 오류
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json(); // 요청 본문에서 사용자 데이터 추출

    if (!name || !email) {
      return new Response(JSON.stringify({ message: "Name and Email are required" }), {
        status: 400, // 요청 오류
        headers: { "Content-Type": "application/json" },
      });
    }

    // MySQL 데이터베이스에 사용자 데이터 삽입
    await pool.query("INSERT INTO USER_LIST (USER_NAME, USER_EMAIL) VALUES (?, ?)", [name, email]);

    return new Response(JSON.stringify({ message: "전송성공" }), {
      status: 201, // 자원 생성 성공
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500, // 서버 내부 오류
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json(); // 요청 본문에서 사용자 ID 추출

    if (!id) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400, // 요청 오류
        headers: { "Content-Type": "application/json" },
      });
    }

    // MySQL 데이터베이스에서 사용자 데이터 삭제
    const [result] = await pool.query("DELETE FROM USER_LIST WHERE USER_ID = ?", [id]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404, // 자원 없음
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "삭제성공" }), {
      status: 200, // 삭제 성공
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500, // 서버 내부 오류
      headers: { "Content-Type": "application/json" },
    });
  }
}
