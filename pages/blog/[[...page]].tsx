import { useEffect, ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { CMS, METADATA } from '../../constants';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { IPath } from '../../types';
import { IPost } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';

import { ArticleCard } from '../../components/cards/ArticleCard';
import { ArticleCardFeature } from '../../components/cards/ArticleCardFeature';
import { CardGrid } from '../../components/cards/CardGrid';
import { Contained } from '../../components/Contained';
import Pagination from '../../components/Pagination';

interface Props {
  posts: IPost[];
  currentPage: number;
  pageCount: number;
}

export default function Blog(props: Props): ReactElement {
  const {
    posts: [featuredPost, ...otherPosts],
    currentPage,
    pageCount,
  } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const pageTitle = generateTitle('Blog');
  const featuredImageURL = featuredPost?.featureImage?.imageUrl;

  const paginationHandler = page => {
    const newRoute = `/blog/${page.selected + 1}`;
    router.push(newRoute);
  };

  useEffect(() => {
    dispatch(setPageType(PageType.BLOG));
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={METADATA.BLOG.DESCRIPTION}></meta>
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={METADATA.BLOG.DESCRIPTION}
          key="ogdesc"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={featuredImageURL} key="ogimage" />
        <meta property="og:url" content={METADATA.BLOG.URL} />
        <link rel="canonical" href={METADATA.BLOG.URL}></link>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={METADATA.BLOG.DESCRIPTION} />
        <meta name="twitter:image" content={featuredImageURL} />
      </Head>

      <div className="flex flex-col w-full mt-12 mb-6 space-y-6 bg-alt">
        <Contained classes={'mb-6'}>
          <h1 className="mb-2 text-4xl font-medium uppercase font-prompt">
            Oxen Blogs
          </h1>
          {featuredPost && <ArticleCardFeature {...featuredPost} />}
        </Contained>

        <CardGrid>
          {otherPosts?.map(post => (
            <ArticleCard key={post.id} {...post} />
          ))}
        </CardGrid>

        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          paginationHandler={paginationHandler}
        />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  console.log(
    `Building blog results page %c${
      context.params.page ? context.params.page[0] : ''
    }`,
    'color: purple;',
  );

  const cms = new CmsApi();
  const page = context.params.page ? Number(context.params.page[0]) : 1;

  try {
    const {
      entries: posts,
      total,
    } = await cms.fetchBlogEntriesWithoutDevUpdates(
      CMS.BLOG_RESULTS_PER_PAGE,
      page,
    );

    const pageCount = Math.ceil(total / CMS.BLOG_RESULTS_PER_PAGE);

    if (page > pageCount && page > 1) {
      throw 'Page results exceeded!';
    }

    return {
      props: {
        posts,
        pageCount,
        currentPage: page,
      },
      revalidate: CMS.CONTENT_REVALIDATE_RATE,
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
      revalidate: CMS.CONTENT_REVALIDATE_RATE,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cms = new CmsApi();

  const { entries, total } = await cms.fetchBlogEntriesWithoutDevUpdates();
  const pageCount = Math.ceil(total / CMS.BLOG_RESULTS_PER_PAGE);
  const paths: IPath[] = [];

  for (let i = 1; i <= pageCount; i++) {
    paths.push({ params: { page: [String(i)] } });
  }

  return { paths, fallback: 'blocking' };
};
