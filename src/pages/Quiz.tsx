import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONS, QuestionItem } from "../data/Question";

/** reducer state & actions */
type State = { index: number; score: number };
type Action =
  | { type: "ANSWER"; correct: boolean }
  | { type: "NEXT" }
  | { type: "RESET" };

const initialState: State = { index: 0, score: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        score: action.correct ? state.score + 1 : state.score,
      };
    case "NEXT":
      return { ...state, index: state.index + 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

/** QuestionCard component (inline to keep files minimal).
 *  Props: q (question), onAnswer callback, disabled flag.
 */
function QuestionCard(props: {
  q: QuestionItem;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}) {
  const { q, onAnswer, disabled } = props;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-sm text-slate-500 mb-2">Question</div>
      <h3 className="text-lg font-semibold mb-4">{q.question}</h3>

      <div className="grid gap-3">
        {q.options.map((opt: string, idx: number) => (
          <button
            key={idx}
            onClick={() => onAnswer(opt === q.correct)}
            disabled={disabled}
            className={`w-full text-left px-4 py-3 rounded-md border transition
              ${disabled ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Quiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timeLeft, setTimeLeft] = useState(10);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  // load current user from localStorage
  const currentUserRaw = localStorage.getItem("currentUser");
  const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

  // Timer effect: runs when question index changes
  useEffect(() => {
    if (!currentUser) {
      navigate("/"); // go back if no user
      return;
    }

    if (state.index >= QUESTIONS.length) return; // finished: saving handled in separate effect

    setTimeLeft(10);
    setDisabled(false);

    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // timeout -> auto-next
          dispatch({ type: "NEXT" });
          return 10;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [state.index, currentUser, navigate]);

  // When quiz is finished, save score and redirect to leaderboard
  useEffect(() => {
    if (state.index >= QUESTIONS.length) {
      const userName = currentUser?.name ?? "Anonymous";
      const raw = localStorage.getItem("leaderboard");
      const list = raw ? JSON.parse(raw) : [];
      const entry = {
        id: Date.now(),
        name: userName,
        score: state.score,
        date: new Date().toISOString(),
      };
      list.push(entry);
      localStorage.setItem("leaderboard", JSON.stringify(list));
      navigate("/leaderboard");
    }
  }, [state.index, state.score, currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded p-6 text-center">
        <p className="text-slate-600">
          No user found. Please start from the Home page.
        </p>
      </div>
    );
  }

  if (state.index >= QUESTIONS.length) return null; // nothing to render while finishing

  const q = QUESTIONS[state.index];

  function handleAnswer(isCorrect: boolean) {
    dispatch({ type: "ANSWER", correct: isCorrect });
    setDisabled(true);
    // short pause so the user sees their click effect, then move next
    setTimeout(() => dispatch({ type: "NEXT" }), 700);
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Player: <span className="font-medium">{currentUser.name}</span>
        </div>
        <div className="text-sm text-slate-500">
          Score: <span className="font-semibold">{state.score}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-slate-600">
          Time left: <span className="font-medium">{timeLeft}s</span>
        </div>
        <div className="w-full bg-gray-200 rounded h-2 mt-2">
          <div
            className="bg-indigo-600 h-2 rounded"
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          />
        </div>
      </div>

      <QuestionCard q={q} onAnswer={handleAnswer} disabled={disabled} />
    </div>
  );
}
