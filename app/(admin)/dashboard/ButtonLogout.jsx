"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";

export default function ButtonLogout() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.replace("/login");
    });
  };

  return (
    <Button variant="destructive" disabled={isPending} onClick={handleLogout}>
      Logout Button
    </Button>
  );
}
