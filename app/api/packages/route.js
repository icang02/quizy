import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.package.findMany({
    include: {
      questions: {
        orderBy: { id: "asc" },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Success fetching data packages.",
      data: data,
    },
    { status: 200 }
  );
}
