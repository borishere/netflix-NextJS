import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname == '/') {
    return NextResponse.redirect('/search');
  }

  return NextResponse.next();
}