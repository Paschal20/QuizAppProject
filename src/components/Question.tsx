import React from "react";

interface QuestionProps {
  question: string;
  options: string[];
  onAnswer: (selectedOption: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, onAnswer }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question}</h2>
      <ul className="space-y-2">
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => onAnswer(option)}
              className="w-full px-4 py-2 text-left border rounded hover:bg-gray-100"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
