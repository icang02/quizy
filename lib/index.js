export const getLocalUserAnswers = (attemptId) => {
  const allUserAnswers = JSON.parse(
    localStorage.getItem("userAnswers") ?? "[]"
  );

  const userAnswers = allUserAnswers.filter(
    (item) => item.attempt_id == attemptId
  );

  return userAnswers;
};

export const getAllLocalUserAnswers = () => {
  const allUserAnswers = JSON.parse(
    localStorage.getItem("userAnswers") ?? "[]"
  );

  return allUserAnswers;
};

export const getSelectedAnswerid = (dataAnswers, questionId) => {
  const selectedAnswerId =
    dataAnswers.find((item) => item.question_id == questionId)?.answer_id ?? "";

  return selectedAnswerId;
};
