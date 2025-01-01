import { create } from "zustand";

// Global state for number question
export const useNumberQuestionStore = create((set) => ({
  numberQuestion: 1,
  updateNumberQuestion: (newValue) => set(() => ({ numberQuestion: newValue })),
}));

// Global state for current question
export const useCurrentQuestionStore = create((set) => ({
  currentQuestion: {},
  updateCurrentQuestion: (newValue) =>
    set(() => ({ currentQuestion: newValue })),
}));

// Global state for user when selected answer
export const useSelectedAnswerIdStore = create((set) => ({
  selectedAnswerId: "",
  updateSelectedAnswerId: (newValue) =>
    set(() => ({ selectedAnswerId: newValue })),
}));

// Global state for user to save answers
export const useUserAnswersStore = create((set) => ({
  userAnswers: [],
  updateUserAnswers: (newValue) => set(() => ({ userAnswers: newValue })),
}));
