export const fetchAPI = async (url, method = "GET", data = {}) => {
  let res;
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET") {
      options.body = JSON.stringify(data);
    }

    res = await fetch(url, options);
    const resJson = await res.json();

    return {
      message: resJson.message,
      data: resJson.data,
    };
  } catch (error) {
    console.error("Error mengambil data:", error);
    return { message: error.message, data: [] };
  }
};

export const getLocalUserAnswers = (attemptId) => {
  const allUserAnswers = JSON.parse(
    localStorage.getItem("userAnswers") ?? "[]"
  );

  const userAnswers = allUserAnswers.filter(
    (item) => item.attempt_id == attemptId
  );

  return userAnswers;
};

export const getSelectedAnswerid = (dataAnswers, questionId) => {
  const selectedAnswerId =
    dataAnswers.find((item) => item.question_id == questionId)?.answer_id ?? "";

  return selectedAnswerId;
};
