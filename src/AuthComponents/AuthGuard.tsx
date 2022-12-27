import { TOKEN } from '@/utils/Cookies/type';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function AuthGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const accessToken = Cookies.get(TOKEN);

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [router, accessToken]);

  // if auth initialized with a valid user show protected page
  if (accessToken) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
