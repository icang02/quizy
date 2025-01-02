"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

export default function ButtonLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.replace("/login");
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center justify-center gap-2"
    >
      <LogOut className="mt-0.5 text-gray-600 size-4" />
      <span>Logout</span>
    </div>
  );
}
