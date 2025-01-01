import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  (await cookies()).set("token", "", { maxAge: 0 });

  return NextResponse.json({ message: "success delete cookie" });
}
