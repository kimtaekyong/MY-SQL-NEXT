import React from "react";

function UserForm({ name, email, setName, setEmail, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <div className="mb-3 flex items-center justify-between gap-x-10">
        <label htmlFor="name">Name:</label>
        <input
          className="text-[#1f1f1f] py-4 px-4"
          id="name"
          type="text"
          placeholder="이름을 작성해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="email">Email:</label>
        <input
          className="text-[#1f1f1f] py-4 px-4"
          id="email"
          placeholder="메일을 작성해주세요"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="p-5 mt-4 border w-full">
        생성
      </button>
    </form>
  );
}

export default UserForm;
