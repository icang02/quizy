import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req, { params }) {
  const { packageId } = await params;

  if (!packageId)
    return NextResponse.json(
      {
        status: 404,
        message: "Error delete question or missing value of params.",
      },
      {
        status: 404,
      }
    );

  await db.package.delete({
    where: {
      id: parseInt(packageId),
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Sukses! Data berhasil dihapus.",
    },
    {
      status: 200,
    }
  );
}
