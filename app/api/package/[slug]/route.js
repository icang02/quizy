import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = await params;

  const data = await db.package.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!data)
    return NextResponse.json(
      {
        status: 404,
        message: "Cannot find data or empty slug.",
      },
      { status: 404 }
    );

  return NextResponse.json(
    {
      status: 200,
      message: "Sukses fetching data package.",
      data: data,
    },
    { status: 200 }
  );
}
