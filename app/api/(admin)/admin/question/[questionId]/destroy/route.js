import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req, { params }) {
  const { questionId } = await params;

  if (!questionId)
    return NextResponse.json(
      {
        status: 404,
        message: "Error delete question data or params not found.",
      },
      { status: 404 }
    );

  await db.question.delete({
    where: {
      id: parseInt(questionId),
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Sukses! Pertanyaan berhasil dihapus.",
    },
    {
      status: 200,
    }
  );
}
