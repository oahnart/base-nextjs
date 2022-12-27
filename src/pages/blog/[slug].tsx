import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { useRouter } from 'next/router';
import { faqApi } from '@/apis/faq';

type IBlogUrl = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<IBlogUrl> = async () => {
  console.log("getStaticPaths");
  
  return {
    paths: [...Array(10)].map((_, index) => ({
      params: { slug: `blog-${index}` },
    })),
    // fallback: false,
    fallback: true,
    // fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<IBlogUrl, IBlogUrl> = async ({
  params,
}) => {
  console.log("getStaticProps");
  const data  = await faqApi({
    page : 1,
    size : 100,
  })
  
  return {
    props: {
      slug: params!.slug,
      data : data
    },
    revalidate: 10,
  };
};

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  console.log("data api" , props);
  

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Main meta={<Meta title={props.slug} description="Lorem ipsum" />}>
      <h1 className="capitalize">{props.slug}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eos
        earum doloribus, quibusdam magni accusamus vitae! Nisi, sunt! Aliquam
        iste expedita cupiditate a quidem culpa eligendi, aperiam saepe dolores
        ipsum!
      </p>
    </Main>
  );
};

export default Blog;
