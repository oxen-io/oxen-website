import { useEffect, useContext, ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { CMS, METADATA } from '../../constants';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { IPost, ITagList } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';
import { ScreenContext } from '../../contexts/screen';

import { ArticleCard } from '../../components/cards/ArticleCard';
import { CardGrid } from '../../components/cards/CardGrid';
import { Contained } from '../../components/Contained';
import { TagBlock } from '../../components/TagBlock';

interface Props {
  posts: IPost[];
  tagPosts: IPost[];
  tag: string;
  currentPage: number;
  pageCount: number;
}

export default function Tag(props: Props): ReactElement {
  const { posts, tagPosts, tag, currentPage, pageCount } = props;
  const { isMobile } = useContext(ScreenContext);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.BLOG));
  }, []);

  const tagHasPosts = tagPosts && tagPosts?.length > 0;
  const featuredPost = posts[0];

  const paginationHandler = page => {
    const newRoute = `/tag/${tag}/${page.selected + 1}`;
    router.push(newRoute);
  };

  // Mobile Pagination Settings
  const MAX_PAGINATION_BUTTONS_MOBILE = 5; // On mobile, we want to only have a maximum of 5 pagination buttons
  const hasTooManyButtons =
    isMobile && pageCount > MAX_PAGINATION_BUTTONS_MOBILE; // Check if the maximum number of pagination buttons have been reached
  const EDGE_PAGES = [1, 2, pageCount - 1, pageCount]; // Check if the current page is an edge page, to keep the number of pagination buttons consistent
  const isEdgePage = isMobile && EDGE_PAGES.includes(currentPage);

  const pagination = (
    <Contained>
      <div className="flex justify-center mb-4">
        <div className="mt-6 tablet:mt-4">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            activeClassName={'active bg-secondary'}
            containerClassName={'pagination bg-primary text-white'}
            initialPage={currentPage - 1}
            pageCount={pageCount}
            marginPagesDisplayed={hasTooManyButtons && !isEdgePage ? 1 : 2}
            pageRangeDisplayed={isMobile ? 1 : 2}
            onPageChange={paginationHandler}
          />
        </div>
      </div>
    </Contained>
  );

  const pageTitle = generateTitle(`${tag} Archives`);
  const featuredImageURL = featuredPost?.featureImage?.imageUrl;

  return (
    <div>
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
        <Contained>
          <h1 className="mb-2 text-4xl font-medium uppercase font-prompt">
            Oxen Blogs
          </h1>
          <div
            className={classNames(
              'flex w-full mt-4 space-x-2 font-sans',
              tagHasPosts
                ? 'items-center'
                : 'flex-col tablet:flex-row tablet:items-center',
            )}
          >
            <p className={'mb-0'}>
              {tagHasPosts
                ? 'Tag Results:'
                : 'There are no posts with the tag:'}
            </p>
            <TagBlock
              size="large"
              tag={tag}
              classes={classNames(!tagHasPosts && 'mt-3 tablet:mt-0')}
            />
          </div>
        </Contained>

        {tagHasPosts && (
          <>
            <CardGrid>
              {tagPosts?.map(post => (
                <ArticleCard key={post.id} {...post} />
              ))}
            </CardGrid>

            {pagination}
          </>
        )}

        <Contained>
          <h3 className="-mb-2 text-3xl font-prompt text-primary">
            Recent Posts
          </h3>
        </Contained>

        <CardGrid>
          {posts?.map(post => (
            <ArticleCard key={post.id} {...post} />
          ))}
        </CardGrid>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  console.log(
    `Building %c${context.params.slug[0]} tag page ${context.params.slug[1]}`,
    'color: purple;',
  );

  const cms = new CmsApi();
  // Get tag query
  const tag = String(context.params.slug[0] ?? '') ?? null;
  const page = Number(context.params.slug[1] ?? 1);

  const RESULTS_PER_PAGE = tag
    ? CMS.BLOG_RESULTS_PER_PAGE_TAGGED
    : CMS.BLOG_RESULTS_PER_PAGE;

  try {
    const {
      entries: tagPosts = [],
      total: tagTotalPosts,
    } = await cms.fetchBlogEntriesByTag(tag ?? '', RESULTS_PER_PAGE, page);

    const { entries: posts, total: totalPosts } = await cms.fetchBlogEntries(
      RESULTS_PER_PAGE,
    );

    const pageCount = Math.ceil(tagTotalPosts / RESULTS_PER_PAGE);

    return {
      props: {
        posts,
        pageCount,
        currentPage: page,
        tag,
        tagPosts,
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

  const tags: ITagList = await cms.fetchTagList();
  // We only generate the first page of results for each tag at build time
  const paths = Object.values(tags).map(tag => {
    return {
      params: {
        slug: [tag, '1'],
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};
