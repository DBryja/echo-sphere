import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const userAgent = req.headers.get("user-agent") || "";
  const isTablet = /mobile|android|iphone|ipad/i.test(userAgent);
  const isPhone =
    /mobile|iphone|android/i.test(userAgent) && !/ipad|tablet/i.test(userAgent);

  if (isPhone) {
    req.headers.set("x-device-type", "phone");
  } else if (isTablet) {
    req.headers.set("x-device-type", "tablet");
  } else {
    req.headers.set("x-device-type", "desktop");
  }

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}
