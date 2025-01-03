import { NextResponse } from "next/server";
import db from "@/lib/db";
import slugify from "slugify";
import { toTitleCase, ucFirst } from "@/lib";

export async function POST(req) {
  const { name, description } = await req.json();

  if (!name || !description)
    return NextResponse.json(
      {
        status: 404,
        message: "Error create data or missing value of body.",
      },
      {
        status: 404,
      }
    );

  const newData = await db.package.create({
    data: {
      name: toTitleCase(name),
      slug: slugify(name, { lower: true, strict: true }),
      description: ucFirst(description),
    },
  });

  return NextResponse.json(
    {
      status: 201,
      message: "Sukses! Data baru berhasil ditambahkan.",
      data: newData,
    },
    {
      status: 201,
    }
  );
}
