import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  const { packageId } = await params;

  const data = await db.package.findFirst({
    where: { id: parseInt(packageId) },
    include: {
      questions: {
        orderBy: { id: "asc" },
      },
    },
    orderBy: { id: "asc" },
  });

  if (!data)
    return NextResponse.json(
      {
        status: 404,
        message: "Admin | Error fetching data or empty params.",
      },
      { status: 404 }
    );

  return NextResponse.json(
    {
      status: 200,
      message: "Admin | Fetching data packages.",
      data: data,
    },
    {
      status: 200,
    }
  );
}
