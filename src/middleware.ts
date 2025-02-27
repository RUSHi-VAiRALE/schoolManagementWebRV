import { clerkMiddleware, createRouteMatcher,currentUser } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route)=>({
  matcher : createRouteMatcher([route]),
  allowedRoutes : routeAccessMap[route]
}));

//console.log(matchers);

export default clerkMiddleware(async (auth, req)=>{
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  console.log("role :",role)
  for (const {matcher , allowedRoutes} of matchers){
    if(matcher(req) && !allowedRoutes.includes(role!)){
      return NextResponse.redirect(new URL(`/${role}`,req.url))
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};