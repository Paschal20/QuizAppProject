import  { useEffect, useMemo, useState } from "react";

type Entry = { id: number; name: string; score: number; date?: string };

export default function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // load entries from localStorage once
  useEffect(() => {
    const raw = localStorage.getItem("leaderboard");
    const arr: Entry[] = raw ? JSON.parse(raw) : [];
    setEntries(arr);
  }, []);

  // persist to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(entries));
  }, [entries]);

  function handleDelete(id: number) {
    if (!confirm("Delete this player?")) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function handleClearAll() {
    if (!confirm("Clear entire leaderboard?")) return;
    setEntries([]);
  }

  // filtered + sorted list
  const visible = useMemo(() => {
    const lower = search.trim().toLowerCase();
    const filtered = entries.filter((e) =>
      e.name.toLowerCase().includes(lower)
    );
    const sorted = filtered
      .slice()
      .sort((a, b) =>
        sortOrder === "desc" ? b.score - a.score : a.score - b.score
      );
    return sorted;
  }, [entries, search, sortOrder]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Leaderboard</h2>
        <div className="flex gap-2">
          <button
            onClick={handleClearAll}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")}
          className="border rounded px-3 py-2"
        >
          <option value="desc">Highest → Lowest</option>
          <option value="asc">Lowest → Highest</option>
        </select>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 text-sm text-slate-600 border-b">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Score</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {visible.length === 0 ? (
          <div className="p-6 text-center text-slate-500">No results</div>
        ) : (
          visible.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-12 gap-2 px-4 py-3 items-center border-b"
            >
              <div className="col-span-6 font-medium">{e.name}</div>
              <div className="col-span-3">{e.score}</div>
              <div className="col-span-3 text-right">
                <button
                  onClick={() => handleDelete(e.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
