"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { fetchAPI, getAllLocalUserAnswers } from "@/lib";

export default function ButtonRestart({ attemptId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const restartExam = () => {
    startTransition(async () => {
      await fetchAPI(process.env.NEXT_PUBLIC_API + "/ujian/restart", "POST", {
        attemptId,
      });
      const allUserAnswers = getAllLocalUserAnswers();
      const filtered = allUserAnswers.filter(
        (item) => item.attempt_id != attemptId
      );
      localStorage.setItem("userAnswers", JSON.stringify(filtered));
      router.push(`/ujian/${attemptId}`);
    });
  };

  return (
    <Button
      onClick={restartExam}
      disabled={isPending}
      variant={"destructive"}
      className="w-fit"
    >
      Ulangi Ujian
    </Button>
  );
}
