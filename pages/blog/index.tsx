import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { ArticleCard } from '../../components/cards/ArticleCard';
import { ArticleCardFeature } from '../../components/cards/ArticleCardFeature';
import { CardGrid } from '../../components/cards/CardGrid';
import { Contained } from '../../components/Contained';
import { TagBlock } from '../../components/TagBlock';
import { CMS, METADATA } from '../../constants';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { IPost } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';

export const getServerSideProps: GetServerSideProps = async context => {
  const cms = new CmsApi();

  // Get tag query
  const tag = String(context.query.tag ?? '') ?? null;
  const page = Math.ceil(Number(context.query.page ?? 1));

  const RESULTS_PER_PAGE = tag
    ? CMS.BLOG_RESULTS_PER_PAGE_TAGGED
    : CMS.BLOG_RESULTS_PER_PAGE;

  // Fetch posts even when tag, for related etc
  // Pagination only occurs when tag isnt defined.
  // If tag is defined, pagination is for tag results
  const { posts, total: totalPosts } = await cms.fetchBlogEntries(
    RESULTS_PER_PAGE,
    tag ? 1 : page,
  );

  // Get tags for pagination
  let tagPosts = [];
  let tagTotalPosts;
  let filteredPosts = posts;
  let filteredTotalPosts = totalPosts;
  if (tag) {
    const {
      posts: _tagPosts = [],
      total: _tagTotalPosts,
    } = await cms.fetchBlogEntriesByTag(tag ?? '', RESULTS_PER_PAGE, page);
    tagPosts = _tagPosts;
    tagTotalPosts = _tagTotalPosts;
  } else {
    // Retrieve all blog posts without the `dev-update` tag when not searching by tag
    const {
      posts: _tagPosts = [],
      total: _tagTotalPosts,
    } = await cms.fetchBlogEntriesWithoutDevUpdates(RESULTS_PER_PAGE, page);

    filteredPosts = _tagPosts;
    filteredTotalPosts = _tagTotalPosts;
  }

  const total = tagTotalPosts ?? filteredTotalPosts;
  const pageCount = Math.ceil(total / RESULTS_PER_PAGE);

  return {
    props: {
      posts: filteredPosts,
      pageCount,
      currentPage: page,
      tag,
      tagPosts,
    },
  };
};

interface Props {
  posts: IPost[];
  tagPosts: IPost[];
  tag: string | null;
  currentPage: number;
  pageCount: number;
}

const Blog = (props: Props) => {
  const { posts, tagPosts, tag, currentPage, pageCount } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.BLOG));
  }, []);

  const tagHasPosts = tagPosts && tagPosts?.length > 0;
  const [featuredPost, ...otherPosts] = posts;
  const showPagination = posts.length > 0 && pageCount > 1;

  console.log('index ➡️ tag:', tag);
  console.log('index ➡️ tagHasPosts:', tagHasPosts);

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

  const pagination = (
    <Contained>
      <div className="flex justify-center mb-4">
        <div className="mt-4 mobile:mt-6">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            activeClassName={'active bg-secondary'}
            containerClassName={'pagination bg-primary text-white front-prompt'}
            initialPage={currentPage - 1}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={paginationHandler}
          />
        </div>
      </div>
    </Contained>
  );

  const pageTitle = generateTitle('Blog');

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
        <meta
          property="og:image"
          content={featuredPost?.featureImage?.imageUrl}
          key="ogimage"
        />
        <meta property="og:url" content={METADATA.BLOG.URL} />
        <link rel="canonical" href={METADATA.BLOG.URL}></link>
      </Head>

      <div className="flex flex-col w-full mt-12 mb-6 space-y-6 bg-alt">
        <Contained>
          {!tag && posts.length && <ArticleCardFeature {...featuredPost} />}

          {tag && (
            <>
              <div className="flex items-center w-full mt-4 space-x-2 font-sans">
                <p className={tagHasPosts ? 'mb-0' : 'mb-10'}>
                  {tagHasPosts
                    ? 'Tag Results:'
                    : 'There are no posts with the tag'}
                </p>
                <TagBlock size="large" tag={tag} />
              </div>
            </>
          )}
        </Contained>

        {/* Tag has posts */}
        {tag && tagHasPosts && (
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
          {tag && (
            <h3 className="-mb-2 text-3xl font-prompt text-primary">
              Recent Posts
            </h3>
          )}
        </Contained>

        {/* Posts, or recent posts if tag */}
        <CardGrid>
          {(tag ? posts : otherPosts)?.map(post => (
            <ArticleCard key={post.id} {...post} />
          ))}
        </CardGrid>

        {!tagHasPosts && pagination}
      </div>
    </div>
  );
};

export default Blog;
