"use client";
import { useRouter } from "nextjs-toploader/app";

import { Button } from "@/components/ui/button";
import { MoveLeft, RefreshCcw } from "lucide-react";

export default function error({ error, reset }) {
  const router = useRouter();
  return (
    <div className="h-screen flex items-center justify-center p-3">
      <div className="text-center">
        <div className="text-7xl">❌</div>
        <h6 className="mt-6 font-bold text-lg">500: Something went wrong!</h6>
        <p className="mt-1 text-sm text-gray-500">{error.message}</p>
        <div className="mt-5 flex space-x-3 justify-center">
          <Button onClick={() => router.push("/")} size="sm">
            <MoveLeft /> Back to home
          </Button>
          <Button size="sm" variant="destructive" onClick={reset}>
            <RefreshCcw /> Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
