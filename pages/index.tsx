import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SideMenu } from '../components/navigation/SideMenu';
import { HomeLanding } from '../components/pages/home/HomeLanding';
import { METADATA, UI } from '../constants';
import { ScreenContext } from '../contexts/screen';
import { CmsApi } from '../services/cms';
import { SideMenuItem } from '../state/navigation';
import { IState } from '../state/reducers';

export async function getServerSideProps() {
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

  const { isTablet } = useContext(ScreenContext);
  const { sideMenuExpanded } = useSelector((state: IState) => state.navigation);

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
          <div
            style={{
              marginLeft: `${isTablet ? UI.SIDE_MENU_SIDE_BAR_WIDTH_PX : 0}px`,
            }}
            className="flex-1 overflow-x-hidden"
          >
            <HomeLanding />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
