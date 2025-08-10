import React from "react";
import type { Question } from "../types";

type Props = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSelect: (idx: number) => void;
  selectedIndex: number | null;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  onSelect,
  selectedIndex,
}) => {
  return (
    <div>
      <div className="text-sm text-gray-500 mb-2">
        Question {questionNumber} / {totalQuestions}
      </div>

      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.answers.map((ans, idx) => {
          const isSelected = selectedIndex === idx;

          // conditional styling: before selection, neutral; after selection show success/fail
          let classes =
            "px-4 py-3 rounded shadow text-left transition-colors duration-150";

          if (selectedIndex === null) {
            classes += " bg-white hover:bg-gray-50";
          } else {
            // after selection — show correct in green, chosen-but-wrong in red
            if (ans.correct) classes += " bg-green-100 border border-green-500";
            else if (isSelected) classes += " bg-red-100 border border-red-500";
            else classes += " bg-gray-100 opacity-70";
          }

          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              disabled={selectedIndex !== null}
              className={classes}
            >
              {ans.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
