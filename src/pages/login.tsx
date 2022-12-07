import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

export default function About() {

  
  const router = useRouter();
  const handleLogin = async() => {
    Cookies.set('TOKEN', 'eherhrej235egrhh');
    router.push('/');
  }

  return (
    <Main meta={<Meta title="Login" description="Login" />}>
      <div>
        <button
          onClick={handleLogin}
        >
          login
        </button>
      </div>
    </Main>
  );
}
