export type QuestionItem = {
  id: number;
  question: string;
  options: string[];
  correct: string; // the text of the correct option
};

export const QUESTIONS: QuestionItem[] = [
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
    question: "What is 4 * 3?",
    options: ["12", "14", "9", "11"],
    correct: "12",
  },
];
