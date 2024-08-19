import mysql from "mysql2/promise";

// MySQL 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// 쿼리 실행 함수
export async function query(sql, values = []) {
  const [results] = await pool.execute(sql, values);
  return results;
}

export default pool;
