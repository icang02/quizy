"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function TableColAnswer({ answer, index }) {
  // State untuk melacak apakah jawaban terlihat
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswerVisibility = (index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle visibilitas jawaban untuk indeks tertentu
    }));
  };

  const isVisible = visibleAnswers[index] || false; // Default ke false jika belum diatur

  return (
    <div className="flex items-center gap-2">
      <span className={`${isVisible ? "blur-none" : "blur-sm"} transition`}>
        {answer}
      </span>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => toggleAnswerVisibility(index)}
      >
        {isVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
