import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher(['sign-in','sign-up'])
const isProtectedRoute= createRouteMatcher(['/home','/dashboard'])
const isAppRoute =createRouteMatcher(['/'])


export default clerkMiddleware(async (auth,req)=>{
    if(isPublicRoute(req)) return;
    if(isProtectedRoute(req)) await auth.protect();
    if(isAppRoute(req))  auth.protect();

},
{debug: true} 
);
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ],
}