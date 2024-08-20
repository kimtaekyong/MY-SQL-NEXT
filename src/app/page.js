import UserList from "../components/UserList";

// 서버 컴포넌트에서 데이터 가져오기
export default async function HomePage() {
  // 데이터 렌더링
  return (
    <div className="h-[100vh] flex justify-center items-center flex-col">
      <UserList />
    </div>
  );
}
