import { useEffect, ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { CMS, METADATA } from '../../constants';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { IPath } from '../../types';
import { IPost } from '../../types/cms';

import CustomHead from '../../components/CustomHead';
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

  const paginationHandler = page => {
    const newRoute = `/blog/${page.selected + 1}`;
    router.push(newRoute);
  };

  useEffect(() => {
    dispatch(setPageType(PageType.BLOG));
  }, []);

  return (
    <>
      <CustomHead
        title={'Blog'}
        metadata={{
          TYPE: METADATA.BLOG_PAGE.TYPE,
          DESCRIPTION: METADATA.BLOG_PAGE.DESCRIPTION,
          OG_IMAGE: {
            URL: featuredPost?.featureImage.imageUrl ?? METADATA.OG_IMAGE.URL,
            WIDTH:
              Number(featuredPost?.featureImage?.width) ??
              METADATA.OG_IMAGE.WIDTH,
            HEIGHT:
              Number(featuredPost?.featureImage?.height) ??
              METADATA.OG_IMAGE.HEIGHT,
            ALT: featuredPost?.featureImage?.title ?? METADATA.OG_IMAGE.ALT,
          },
        }}
      />
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
    `Building  Blog posts page %c${
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
