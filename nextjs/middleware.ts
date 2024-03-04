import { cookies } from "next/headers"
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const role  = cookies().get('role_user')
  const path = request.nextUrl.pathname;
  if (role?.value === 'SUPER_ADMIN' && path.startsWith('/role')) {
    return NextResponse.next(); // Allow access to the '/role/*' paths for SUPER_ADMIN
  }

  // Check if the role is ADMIN and the path matches '/artical/*'
  if (role?.value === 'ADMIN' && path.startsWith('/banner')) {
    return NextResponse.next(); // Allow access to the '/artical/*' paths for ADMIN
  }

  // Redirect to '/' if the user doesn't have the required role or tries to access unauthorized paths
  return NextResponse.redirect(new URL('/', request.url));
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/role/:path*', '/banner/:path*'],
  
}