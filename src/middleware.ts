import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ['/admin', '/profile'];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

    if (!isProtectedPath) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
        const loginUrl = new URL("/auth/signin", req.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (pathname.startsWith('/admin') && token.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/profile'],
};
