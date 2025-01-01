import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    return NextResponse.json({ message: "Missing tag!", data: false });
  }
  revalidateTag(tag);

  return NextResponse.json({
    message: "Revalidate tag succes!",
    data: Date.now(),
  });
}
