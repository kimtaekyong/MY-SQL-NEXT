import React from "react";

function DeleteButton({ text, userId, apiEndpoint, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        // 삭제 성공 시 콜백 함수 호출
        onDeleteSuccess(userId);
        alert("삭제성공");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Internal Server Error");
    }
  };

  return (
    <button className="p-2 px-4 text-base bg-purple" onClick={handleDelete}>
      {text}
    </button>
  );
}

export default DeleteButton;
