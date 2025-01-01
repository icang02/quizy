import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token") || null;

  const { pathname } = request.nextUrl;

  // // Define dynamic patterns based on matcher configuration
  const ujianPattern = /^\/ujian\/(\d+)$/;
  const skorPattern = /^\/ujian\/(\d+)\/skor$/;

  if (skorPattern.test(pathname) || ujianPattern.test(pathname)) {
    // // Attempt to extract `attemptId` from the pathname
    let attemptId =
      pathname.match(skorPattern)?.[1] || pathname.match(ujianPattern)?.[1];

    // // Check time exam is done or not
    const data = await fetch(
      process.env.NEXT_PUBLIC_API + `/middleware/attempt/${attemptId}`,
      {
        method: "POST",
      }
    );
    const { data: attempt } = await data.json();
    let status = attempt.status;

    // Update status if time exam is end
    if (new Date(attempt.end_time).getTime() <= new Date().getTime()) {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API + "/ujian/status/update",
        {
          method: "POST",
          body: JSON.stringify({ attemptId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await res.json();
      status = data.status;
    }

    if (skorPattern.test(pathname)) {
      if (!status) {
        return NextResponse.redirect(
          new URL(`/ujian/${attemptId}`, request.url)
        );
      }
    } else if (ujianPattern.test(pathname)) {
      if (status) {
        return NextResponse.redirect(
          new URL(`/ujian/${attemptId}/skor`, request.url)
        );
      }
    }
  }

  if (token && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/ujian/:attemptId", "/ujian/:attemptId/skor"],
};
