import { type NextRequest, NextResponse } from 'next/server';

// Get allowed origins from environment variables
const allowedOrigins = [
  process.env.NEXT_PUBLIC_APP_URL || "https://watersolutionscatalogue.com",
  process.env.NEXT_PUBLIC_SUPABASE_URL,
].filter(Boolean); // Remove undefined values

export async function middleware(request: NextRequest) {
  // Create the response by calling your existing logic
  const origin = request.headers.get("origin"); // Get the origin of the request
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevent MIME sniffing
  response.headers.set('X-Frame-Options', 'DENY'); // Prevent clickjacking
  response.headers.set('X-XSS-Protection', '1; mode=block'); // Enable XSS filtering

  // Optionally, include other headers like CORS
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin); // Dynamically set allowed origin
  } else {
    response.headers.set("Access-Control-Allow-Origin", "null"); // Block disallowed origins
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};