import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./route";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

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
        return NextResponse.redirect(new URL(`/ujian/${attemptId}`, req.url));
      }
    } else if (ujianPattern.test(pathname)) {
      if (status) {
        return NextResponse.redirect(
          new URL(`/ujian/${attemptId}/skor`, req.url)
        );
      }
    }
  }

  const { nextUrl } = req;
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("token") ?? null;

  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isPublicRoutes = publicRoutes.some((route) => {
    if (typeof route === "string") {
      return route === nextUrl.pathname;
    } else if (route instanceof RegExp) {
      return route.test(nextUrl.pathname);
    }
    return false;
  });

  if (isApiAuthRoutes) {
    return;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
// export const config = {
//   matcher: ["/ujian/:attemptId", "/ujian/:attemptId/skor"],
// };
