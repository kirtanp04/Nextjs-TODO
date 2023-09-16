import { NextResponse } from 'next/server'


 
// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  const token = req.cookies.get('next_auth_ticket')
  if (token) {
   return NextResponse.next()
  }else{
    return NextResponse.redirect(new URL('/', req.url))
  }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/todo/:path*',
}