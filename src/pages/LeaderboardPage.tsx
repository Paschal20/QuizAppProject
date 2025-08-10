import React, { useState, useEffect } from "react";

type Player = {
  name: string;
  score: number;
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Load leaderboard from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("leaderboard");
    if (stored) {
      setLeaderboard(JSON.parse(stored));
    }
  }, []);

  // Save leaderboard to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  // Delete a single player by index
  function deletePlayer(index: number) {
    setLeaderboard((prev) => prev.filter((_, i) => i !== index));
  }

  // Clear entire leaderboard
  function clearLeaderboard() {
    if (
      window.confirm("Are you sure you want to clear the entire leaderboard?")
    ) {
      setLeaderboard([]);
    }
  }

  // Filter leaderboard by search term (case-insensitive)
  const filtered = leaderboard.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered leaderboard by score according to sortOrder
  filtered.sort((a, b) =>
    sortOrder === "desc" ? b.score - a.score : a.score - b.score
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search player by name..."
        className="border rounded px-3 py-2 mb-4 w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sort buttons */}
      <div className="mb-4">
        <button
          onClick={() => setSortOrder("desc")}
          className={`px-4 py-2 mr-2 rounded ${
            sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort: Highest to Lowest
        </button>
        <button
          onClick={() => setSortOrder("asc")}
          className={`px-4 py-2 rounded ${
            sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort: Lowest to Highest
        </button>
      </div>

      {/* Clear leaderboard button */}
      <button
        onClick={clearLeaderboard}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear Leaderboard
      </button>

      {/* Leaderboard table */}
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-lg">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Player Name</th>
            <th className="border border-gray-300 px-4 py-2">Score</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No players found.
              </td>
            </tr>
          ) : (
            filtered.map((player, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {player.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {player.score}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => deletePlayer(index)}
                    className="text-red-600 hover:underline"
                    aria-label={`Delete ${player.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
