import { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the structure of a question
type Question = {
  id: number;
  question: string;
  options: string[];
  correct: string;
};

// Sample questions (you may move these to a separate file if you want)
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    correct: "4",
  },
  {
    id: 2,
    question: "Capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "Paris",
  },
  {
    id: 3,
    question: "Who wrote Hamlet?",
    options: ["Tolkien", "Shakespeare", "Austen", "Dickens"],
    correct: "Shakespeare",
  },
  {
    id: 4,
    question: "4 * 3 = ?",
    options: ["12", "14", "9", "11"],
    correct: "12",
  },
];

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

export default function QuizPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [time, setTime] = useState(10);
  const navigate = useNavigate();

  // Handle timer and quiz progress
  useEffect(() => {
    // When quiz is finished
    if (state.index >= QUESTIONS.length) {
      // Load current user from localStorage
      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

      if (user.name) {
        // Load leaderboard or create new
        const leaderboard: { name: string; score: number }[] = JSON.parse(
          localStorage.getItem("leaderboard") || "[]"
        );

        // Add or update player score
        leaderboard.push({ name: user.name, score: state.score });

        // Save leaderboard back to localStorage
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      }

      // Redirect to leaderboard page
      navigate("/leaderboard");
      return;
    }

    // Reset timer for next question
    setTime(10);

    // Set interval to count down time
    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          dispatch({ type: "NEXT" });
          return 10;
        }
        return t - 1;
      });
    }, 1000);

    // Cleanup timer on unmount or state change
    return () => clearInterval(timer);
  }, [state.index, state.score, navigate]);

  if (state.index >= QUESTIONS.length) return null; // Avoid rendering after quiz ends

  const currentQuestion = QUESTIONS[state.index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-4">
      <h2 className="text-xl mb-2">Time: {time}s</h2>
      <h1 className="text-2xl mb-4 text-center">{currentQuestion.question}</h1>

      <form className="flex flex-col w-full max-w-md">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            className="border px-4 py-2 m-1 rounded hover:bg-gray-200"
            onClick={(event) => {
              event.preventDefault();
              dispatch({
                type: "ANSWER",
                correct: option === currentQuestion.correct,
              });
              dispatch({ type: "NEXT" });
            }}
          >
            {option}
          </button>
        ))}
      </form>
    </div>
  );
}
