import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: "blablabla123",
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ message: "success set cookie" });
}
