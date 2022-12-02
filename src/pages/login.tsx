/* eslint-disable unused-imports/no-unused-vars */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

export default function About() {
  const router = useRouter();
  return (
    <Main meta={<Meta title="Login" description="Login" />}>
      <div>
        <button
          onClick={() => {
            Cookies.set('TOKEN', 'eherhrej235egrhh');
            router.push('/');
          }}
        >
          login
        </button>
      </div>
    </Main>
  );
}
