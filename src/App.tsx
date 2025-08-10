
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/LeaderboardPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Mini Quiz Game</h1>
          <nav className="space-x-4 text-sm">
            <Link className="text-slate-600 hover:text-slate-900" to="/">
              Home
            </Link>
            <Link className="text-slate-600 hover:text-slate-900" to="/quiz">
              Quiz
            </Link>
            <Link
              className="text-slate-600 hover:text-slate-900"
              to="/leaderboard"
            >
              Leaderboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}
