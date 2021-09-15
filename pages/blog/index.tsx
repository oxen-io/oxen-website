import { useEffect, useContext } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import { CMS, METADATA } from '../../constants';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { IPost } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';
import { ScreenContext } from '../../contexts/screen';

import { ArticleCard } from '../../components/cards/ArticleCard';
import { ArticleCardFeature } from '../../components/cards/ArticleCardFeature';
import { CardGrid } from '../../components/cards/CardGrid';
import { Contained } from '../../components/Contained';

export const getServerSideProps: GetServerSideProps = async context => {
  const cms = new CmsApi();
  const page = Number(context.query.page ?? 1);

  const { entries: posts, total: totalPosts } = await cms.fetchBlogEntries(
    CMS.BLOG_RESULTS_PER_PAGE,
  );

  let filteredPosts = posts;
  let filteredTotalPosts = totalPosts;

  const {
    entries: _entries,
    total: _total,
  } = await cms.fetchBlogEntriesWithoutDevUpdates(
    CMS.BLOG_RESULTS_PER_PAGE,
    page,
  );

  filteredPosts = _entries;
  filteredTotalPosts = _total;

  const total = filteredTotalPosts;
  const pageCount = Math.ceil(total / CMS.BLOG_RESULTS_PER_PAGE);

  return {
    props: {
      posts: filteredPosts,
      pageCount,
      currentPage: page,
    },
  };
};

interface Props {
  posts: IPost[];
  currentPage: number;
  pageCount: number;
}

const Blog = (props: Props) => {
  const { posts, currentPage, pageCount } = props;
  const { isMobile } = useContext(ScreenContext);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.BLOG));
  }, []);

  const [featuredPost, ...otherPosts] = posts;

  const paginationHandler = page => {
    const currentPath = router.pathname;

    // Copy current query to avoid its removing
    const currentQuery = { ...router.query };
    currentQuery.page = page.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
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

  const pageTitle = generateTitle('Blog');
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
        <Contained classes={'mb-6'}>
          <h1 className="mb-2 text-4xl font-medium uppercase font-prompt">
            Oxen Blogs
          </h1>
          {posts.length && <ArticleCardFeature {...featuredPost} />}
        </Contained>

        <CardGrid>
          {otherPosts?.map(post => (
            <ArticleCard key={post.id} {...post} />
          ))}
        </CardGrid>

        {pagination}
      </div>
    </div>
  );
};

export default Blog;
