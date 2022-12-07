/* eslint-disable unused-imports/no-unused-vars */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { loginApi } from '@/apis';

export default function About() {

  
  const router = useRouter();
  const handleLogin = async() => {
    const res: any = await loginApi({
      userName: "user2",
      password: "abc123",
    });
    
    // Cookies.set('TOKEN', 'eherhrej235egrhh');
    // Cookies.set('TEST', '1235');
    // router.push('/');
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
