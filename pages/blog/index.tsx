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
import { CMS } from '../../constants';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { IPost } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';

export const getServerSideProps: GetServerSideProps = async context => {
  const api = new CmsApi();

  // Get tag query
  const tag = String(context.query.tag ?? '') ?? null;
  const page = Math.ceil(Number(context.query.page ?? 1));

  // Fetch posts even when tag, for related etc
  const { posts, total } = await api.fetchBlogEntries(
    CMS.BLOG_RESULTS_PER_PAGE,
    page,
  );

  const pageCount = Math.floor(total / CMS.BLOG_RESULTS_PER_PAGE);

  // Todo, instead of making 2 reqs, filter over 1 req
  // const tagPosts = tag ? await api.fetchBlogEntriesByTag(tag ?? '') : [];
  const tagPosts = posts?.filter(post => post.tags.includes(tag)) ?? [];

  return {
    props: { posts, tagPosts, tag, pageCount, currentPage: page },
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

  return (
    <div>
      <Head>
        <title>{generateTitle('Blog')}</title>
      </Head>

      <div className="flex flex-col w-full mt-6 mb-6 space-y-10 bg-alt">
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
              {(tag ? posts : otherPosts)?.map(post => (
                <ArticleCard key={post.id} {...post} />
              ))}
            </CardGrid>
          </>
        )}

        <Contained>
          {tag && (
            <h3 className="-mb-6 text-2xl font-prompt text-primary">
              Recent Posts
            </h3>
          )}
        </Contained>

        <CardGrid>
          {(tag ? posts : otherPosts)?.map(post => (
            <ArticleCard key={post.id} {...post} />
          ))}
        </CardGrid>

        <Contained>
          <div className="flex justify-center mb-4">
            {showPagination && (
              <div className="mt-8 mobile:mt-12">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  activeClassName={'active bg-secondary'}
                  containerClassName={
                    'pagination bg-primary text-white front-prompt'
                  }
                  subContainerClassName={''}
                  initialPage={currentPage - 1}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={paginationHandler}
                />
              </div>
            )}
          </div>
        </Contained>
      </div>
    </div>
  );
};

export default Blog;
