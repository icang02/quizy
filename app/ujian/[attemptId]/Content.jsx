"use client";
import { useEffect, useTransition } from "react";
import { useRouter } from "nextjs-toploader/app";

import {
  useCurrentQuestionStore,
  useFinishedTimeExamStore,
  useNumberQuestionStore,
  useSelectedAnswerIdStore,
  useUserAnswersStore,
} from "@/hooks/store";
import { fetchAPI, getLocalUserAnswers, getSelectedAnswerid } from "@/lib";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default function Content({ attempt }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { finishedTimeExam } = useFinishedTimeExamStore();
  const { currentQuestion, updateCurrentQuestion } = useCurrentQuestionStore();
  const { numberQuestion, updateNumberQuestion } = useNumberQuestionStore();
  const { userAnswers, updateUserAnswers } = useUserAnswersStore();
  const { selectedAnswerId, updateSelectedAnswerId } =
    useSelectedAnswerIdStore();

  useEffect(() => {
    const dataAnswers = getLocalUserAnswers(attempt.id);
    if (dataAnswers.length != 0) {
      const selectedAnswerId = getSelectedAnswerid(
        dataAnswers,
        currentQuestion.id ?? attempt.package.questions[numberQuestion - 1].id
      );

      updateSelectedAnswerId(selectedAnswerId);
    }

    return () => {
      updateCurrentQuestion({});
      updateNumberQuestion(1);
      updateUserAnswers([]);
      updateSelectedAnswerId("");
    };
  }, []);

  const handleNextQuestion = () => {
    const indexQuestion = attempt.package.questions.findIndex(
      (q) =>
        q.id == attempt.package.questions[numberQuestion - 1].id ??
        currentQuestion.id
    );

    if (
      indexQuestion !== -1 &&
      attempt.package.questions.length !== numberQuestion
    ) {
      const newNumberQuestion = numberQuestion + 1;
      const nextQuestion = attempt.package.questions[newNumberQuestion - 1];

      const dataAnswers = getLocalUserAnswers(attempt.id);
      if (dataAnswers.length != 0) {
        const selectedAnswerId = getSelectedAnswerid(
          dataAnswers,
          nextQuestion.id
        );
        updateSelectedAnswerId(selectedAnswerId);
      }

      updateNumberQuestion(newNumberQuestion);
      updateCurrentQuestion(nextQuestion);
    }
  };

  const submitAnswer = async (e) => {
    e.preventDefault();

    const updatedAnswer = {
      attempt_id: attempt.id,
      question_id:
        attempt.package.questions[numberQuestion - 1].id ?? currentQuestion.id,
      answer_id: selectedAnswerId,
    };

    // Ambil data lama dari localStorage
    const existingAnswers = JSON.parse(
      localStorage.getItem("userAnswers") ?? "[]"
    );

    // Cari indeks dari question_id yang sama
    const existingIndex = existingAnswers.findIndex(
      (answer) =>
        answer.attempt_id === attempt.id &&
        answer.question_id === updatedAnswer.question_id
    );
    if (existingIndex !== -1) {
      existingAnswers[existingIndex] = updatedAnswer;
    } else {
      existingAnswers.push(updatedAnswer);
    }

    // Simpan kembali ke localStorage
    localStorage.setItem("userAnswers", JSON.stringify(existingAnswers));

    const updatedUserAnswers = existingAnswers.filter(
      (item) => item.attempt_id == attempt.id
    );
    updateUserAnswers(updatedUserAnswers);
    handleNextQuestion();
  };

  const submitExam = () => {
    const userAnswers = getLocalUserAnswers(attempt.id);
    startTransition(async () => {
      await fetchAPI(process.env.NEXT_PUBLIC_API + "/ujian/store", "POST", {
        attemptId: attempt.id,
        userAnswers: userAnswers,
      });
      router.replace(`/ujian/${attempt.id}/skor`);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-sm md:text-base select-none">
          {currentQuestion.question ??
            attempt.package.questions[numberQuestion - 1].question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitAnswer} className="-mt-1.5">
          <RadioGroup className="w-fit">
            {(
              currentQuestion.answers ??
              attempt.package.questions[numberQuestion - 1].answers
            ).map((q, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem
                  onClick={() => updateSelectedAnswerId(q.id)}
                  id={q.id}
                  value={q.id}
                  checked={q.id == selectedAnswerId}
                />
                <Label htmlFor={q.id} className="py-0.5 text-[13px] md:text-sm">
                  <span className="leading-relaxed select-none">
                    {q.answer}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between select-none">
            <div>
              <Button
                disabled={!selectedAnswerId || isPending || finishedTimeExam}
                type="submit"
                size={"sm"}
                className="bg-blue-600 hover:bg-blue-600/90 text-white text-[10px] md:text-xs uppercase tracking-wider"
              >
                Simpan dan Lanjutkan
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={
                  attempt.package.questions.length === numberQuestion ||
                  isPending ||
                  finishedTimeExam
                }
                type="button"
                size={"sm"}
                className="ms-1.5 bg-yellow-600 hover:bg-yellow-600/90 text-white text-[10px] md:text-xs uppercase tracking-wider"
              >
                Lewatkan
              </Button>
            </div>

            {userAnswers.length === attempt.package.questions.length && (
              <div>
                <Button
                  disabled={isPending}
                  onClick={submitExam}
                  type="button"
                  size={"sm"}
                  variant="destructive"
                  className="mt-1.5 md:mt-0 text-[10px] md:text-xs uppercase tracking-wider"
                >
                  Akhiri Ujian
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
