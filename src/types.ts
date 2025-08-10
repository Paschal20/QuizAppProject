// small, explicit types for clarity
export type Answer = {
  text: string;
  correct?: boolean; // optional; true if correct
};

export type Question = {
  question: string;
  answers: Answer[];
};


