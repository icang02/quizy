"use client";
import { useNumberQuestionStore } from "@/hooks/store";
import Timer from "./Timer";

export default function Header({ attempt }) {
  const { numberQuestion } = useNumberQuestionStore();

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-base md:text-xl font-bold">Soal {numberQuestion}</h1>
      <h1 className="font-medium hidden md:block">{attempt.package.name}</h1>
      <Timer
        attemptId={attempt.id}
        startTime={attempt.start_time}
        endTime={attempt.end_time}
      />
    </div>
  );
}
