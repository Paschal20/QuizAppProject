import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function startQuiz() {
    const trimmed = name.trim();
    if (!trimmed) {
      alert("Please enter your name.");
      return;
    }
    // Save currentUser in localStorage
    localStorage.setItem("currentUser", JSON.stringify({ name: trimmed }));
    navigate("/quiz");
  }

  return (
    <div className="mx-auto max-w-xl bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-3">Welcome</h2>
      <p className="text-sm text-slate-600 mb-4">
        Enter your name to start the quiz. Your score will be saved to the
        leaderboard.
      </p>

      <label className="block mb-2 text-sm font-medium">Player name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Your name"
      />

      <div className="flex gap-3">
        <button
          onClick={startQuiz}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Start Quiz
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className="bg-gray-100 px-4 py-2 rounded"
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
}
