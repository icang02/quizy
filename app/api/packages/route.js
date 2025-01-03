import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const rawData = await db.package.findMany({
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  // Transform data to rename `_count.questions` to `questions`
  const data = rawData.map((pkg) => ({
    ...pkg,
    questions: pkg._count.questions,
  }));

  // Remove `_count` field from the response
  data.forEach((pkg) => delete pkg._count);

  return NextResponse.json(
    {
      status: 200,
      message: "Sukses fetching data packages.",
      data: data,
    },
    { status: 200 }
  );
}
