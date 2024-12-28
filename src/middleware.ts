import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {getToken} from 'next-auth/jwt';

const protectedPaths = ['/admin'];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if(!protectedPaths.some((path) => path.startsWith(path))) {
        return NextResponse.next();
    }

    const token = await getToken({req, secret: process.env.JWT_SECRET});

    if(!token){
        const url = new URL("/login", req.url);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
    }

    if(pathname.startsWith('/admin') && token.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin'],
};