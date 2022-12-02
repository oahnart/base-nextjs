import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PRIVATE_ROUTES = ['/about', '/blog'];

const PAGE_LOGIN = '/login';

export default function middleware(req: NextRequest) {
  const { cookies } = req;

  const jwt = cookies.get('TOKEN')?.value;

  const { url } = req;

  const { origin } = req.nextUrl.clone();

  if (url.includes(PAGE_LOGIN)) {
    if (jwt) {
      try {
        return NextResponse.redirect(`${origin}/`);
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const route of PRIVATE_ROUTES) {
    if (url.includes(route)) {
      if (jwt === undefined) {
        return NextResponse.redirect(`${origin}${PAGE_LOGIN}`);
      }
      try {
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(`${origin}${PAGE_LOGIN}`);
      }
    }
  }

  return NextResponse.next();
}
