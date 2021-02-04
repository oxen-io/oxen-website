import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import { SideMenu } from '../components/navigation/SideMenu';
import { HomeLanding } from '../components/pages/home/HomeLanding';
import { METADATA } from '../constants';
import { CmsApi } from '../services/cms';
import { SideMenuItem } from '../state/navigation';

export async function getServerSideProps(context) {
  const api = new CmsApi();
  const page = await api.fetchPageById(SideMenuItem.WHO_ARE_WE);

  console.log('index ➡️  page:', page);
  return { props: page };
}

const Index = (
  page: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  // const cards = posts
  //   ? posts.slice(0, 4).map(post => <ArticleCard key={post.id} {...post} />)
  //   : [];

  // console.log('posts', posts);

  return (
    <div>
      <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          property="og:title"
          content="Oxen - Privacy should be simple."
          key="title"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <div className="flex-grow border-t border-black">
        <div className="flex w-full h-full">
          <SideMenu />
          <div className="flex-1 overflow-x-hidden">
            <HomeLanding />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
