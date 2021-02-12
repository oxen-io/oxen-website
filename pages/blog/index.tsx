import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ArticleCard } from '../../components/cards/ArticleCard';
import { ArticleCardFeature } from '../../components/cards/ArticleCardFeature';
import { CardGrid } from '../../components/cards/CardGrid';
import { Contained } from '../../components/Contained';
import { TagBlock } from '../../components/TagBlock';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { IPost } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';

export const getServerSideProps: GetServerSideProps = async context => {
  const api = new CmsApi();

  // Get tag query
  const tag = String(context.query.tag ?? '') ?? null;

  // Fetch posts even when tag, for related etc
  const posts = await api.fetchBlogEntries();

  // Todo, instead of making 2 reqs, filter over 1 req
  // const tagPosts = tag ? await api.fetchBlogEntriesByTag(tag ?? '') : [];
  const tagPosts = posts.filter(post => post.tags.includes(tag));

  return { props: { posts, tagPosts, tag } };
};

interface Props {
  posts: IPost[];
  tagPosts: IPost[];
  tag: string | null;
}

const Blog = ({ posts, tagPosts, tag }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.BLOG));
  }, []);

  const tagHasPosts = tagPosts && tagPosts?.length > 0;
  const [featuredPost, ...otherPosts] = posts;

  console.log('index ➡️ tag:', tag);
  console.log('index ➡️ tagHasPosts:', tagHasPosts);

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
      </div>
    </div>
  );
};

export default Blog;
