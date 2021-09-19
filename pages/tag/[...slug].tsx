import { useEffect, ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { CMS, METADATA } from '../../constants';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { IPath } from '../../types';
import { IPost } from '../../types/cms';

import CustomHead from '../../components/CustomHead';
import { ArticleCard } from '../../components/cards/ArticleCard';
import { CardGrid } from '../../components/cards/CardGrid';
import { Contained } from '../../components/Contained';
import { TagBlock } from '../../components/TagBlock';
import Pagination from '../../components/Pagination';

interface Props {
  posts: IPost[];
  tagPosts: IPost[];
  tag: string;
  currentPage: number;
  pageCount: number;
}

export default function Tag(props: Props): ReactElement {
  const { posts, tagPosts, tag, currentPage, pageCount } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const tagHasPosts = tagPosts && tagPosts?.length > 0;

  const paginationHandler = page => {
    const newRoute = `/tag/${tag}/${page.selected + 1}`;
    router.push(newRoute);
  };

  useEffect(() => {
    dispatch(setPageType(PageType.BLOG));
  }, []);

  return (
    <>
      <CustomHead
        title={tag === 'dev-update' ? 'Dev Updates' : `${tag} Archives`}
        metadata={{
          TYPE: METADATA.TAG_PAGE.TYPE,
          DESCRIPTION: METADATA.TAG_PAGE.DESCRIPTION,
          OG_IMAGE: {
            URL: posts[0]?.featureImage.imageUrl ?? METADATA.OG_IMAGE.URL,
            WIDTH:
              Number(posts[0]?.featureImage?.width) ?? METADATA.OG_IMAGE.WIDTH,
            HEIGHT:
              Number(posts[0]?.featureImage?.height) ??
              METADATA.OG_IMAGE.HEIGHT,
            ALT: posts[0]?.featureImage?.title ?? METADATA.OG_IMAGE.ALT,
          },
        }}
      />
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

            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              paginationHandler={paginationHandler}
            />
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  console.log(
    `Building  Results for tag "%c${context.params.slug[0]}" page ${
      context.params.slug && context.params.slug[1]
        ? context.params.slug[1]
        : ''
    }`,
    'color: purple;',
  );

  const cms = new CmsApi();
  const tag = String(context.params.slug[0] ?? '') ?? null;
  const page = Number(context.params.slug[1] ?? 1);

  try {
    const {
      entries: tagPosts = [],
      total: tagTotalPosts,
    } = await cms.fetchBlogEntriesByTag(
      tag,
      CMS.BLOG_RESULTS_PER_PAGE_TAGGED,
      page,
    );

    const { entries: posts, total: totalPosts } = await cms.fetchBlogEntries(
      CMS.BLOG_RESULTS_PER_PAGE_TAGGED,
    );

    const pageCount = Math.ceil(
      tagTotalPosts / CMS.BLOG_RESULTS_PER_PAGE_TAGGED,
    );

    if (page > pageCount && page > 1) {
      throw 'Page results exceeded!';
    }

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

  const tags = Object.values(await cms.fetchTagList());
  const paths: IPath[] = [];

  for (let i = 0; i < tags.length; i++) {
    const { entries, total } = await cms.fetchBlogEntriesByTag(tags[i]);
    const pageCount = Math.ceil(total / CMS.BLOG_RESULTS_PER_PAGE);
    const _paths = [];

    for (let i = 1; i <= pageCount; i++) {
      _paths.push({ params: { slug: [tags[i], String(i)] } });
    }

    paths.push(..._paths);
  }

  return {
    paths,
    fallback: 'blocking',
  };
};
