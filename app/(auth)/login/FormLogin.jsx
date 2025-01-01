"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";

export default function FormLogin() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = () => {
    startTransition(async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.replace("/dashboard");
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Button disabled={isPending} onClick={handleLogin}>
        Login Button
      </Button>
    </div>
  );
}
