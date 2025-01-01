"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Timer({ startTime, endTime, attemptId }) {
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [totalDuration, setTotalDuration] = useState("00:00:00");
  const [isCritical, setIsCritical] = useState(false);
  const router = useRouter();

  const endExam = async () => {
    alert("timout exam...");
  };

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();

      const difference = end - now;
      const totalDifference = end - start;

      // Hitung durasi total
      if (totalDifference > 0) {
        const totalHours = Math.floor(
          (totalDifference / (1000 * 60 * 60)) % 24
        );
        const totalMinutes = Math.floor((totalDifference / (1000 * 60)) % 60);
        const totalSeconds = Math.floor((totalDifference / 1000) % 60);

        setTotalDuration(
          `${String(totalHours).padStart(2, "0")}:${String(
            totalMinutes
          ).padStart(2, "0")}:${String(totalSeconds).padStart(2, "0")}`
        );
      } else {
        setTotalDuration("00:00:00");
      }

      // Hitung waktu tersisa
      if (difference < 0) {
        setTimeLeft("00:00:00");
        setIsCritical(true);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );

      // Periksa apakah waktu tinggal 5 menit atau kurang
      setIsCritical(difference <= 5 * 60 * 1000);
    };

    calculateTime();
    const timerInterval = setInterval(calculateTime, 1000);

    return () => clearInterval(timerInterval);
  }, [startTime, endTime, router]);

  return (
    <div
      className={`relative group flex items-center justify-center gap-4 px-3 py-1.5 rounded border 
        ${
          isCritical
            ? "bg-red-50 border-red-200"
            : "bg-green-50 border-green-200"
        }`}
    >
      {/* Waktu tersisa */}
      <span
        className={`font-mono text-lg ${
          isCritical
            ? "text-red-600 animate-pulse duration-1000"
            : "text-green-600"
        }`}
      >
        {timeLeft}
      </span>

      {/* Durasi total (hidden by default, shown on hover) */}
      <span
        className="bg-white px-3 py-2 border absolute opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-200 font-mono text-sm text-gray-600"
        style={{ top: "100%", marginTop: "4px" }}
      >
        <span className="text-[11px]">Durasi:</span> <br />
        <span className="text-green-600">{totalDuration}</span>
      </span>
    </div>
  );
}
