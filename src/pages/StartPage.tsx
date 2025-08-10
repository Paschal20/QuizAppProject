import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) return;
    localStorage.setItem("currentUser", JSON.stringify({ name }));
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Mini Quiz Game</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border p-2 rounded mb-4"
      />
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Quiz
      </button>
    </div>
  );
}
