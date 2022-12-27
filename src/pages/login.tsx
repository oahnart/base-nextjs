import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { Col, Row } from 'antd';

import Styles from "@/common/styles/login.module.scss"
// import { getNewSletterList } from '@/apis';
import { InferGetServerSidePropsType } from 'next/types';

export default function About(props : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const handleLogin = async() => {
    Cookies.set('TOKEN', 'eherhrej235egrhh');
    router.push('/');
  }

  console.log("props",props);
  

  return (
    <Main meta={<Meta title="Login" description="Login" />}>
      <div className={Styles.container}>
        <Row>
          <Col span={12}>geg</Col>
          <Col span={12}>bb</Col>
        </Row>
        <button
          onClick={handleLogin}
          className={Styles.btn}
        >
          login
        </button>
      </div>
    </Main>
  );
}

// export async function getServerSideProps({ params, req, res, query } : any) {
export async function getServerSideProps() {
  // const data: any = await getNewSletterList({
  //   page: "1",
  //   size: "10",
  //   authorSearch: "",
  //   categories: "",
  //   categoryCode: "NEWS",
  //   contentSearch: "",
  //   endTime: "",
  //   startTime: "",
  //   hashtag: "",
  //   query: "",
  //   titleSearch: "",
  // });
  
  // return {
  //   props: {
  //     data
  //   },
  // };
  return {
    props : {}
  }
}