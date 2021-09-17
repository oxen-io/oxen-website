import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import { CMS } from '../../constants';
import { CmsApi } from '../../services/cms';

import BlogPage, { BlogPageProps } from '../../components/BlogPage';

interface IPath {
  params: { page: string[] };
}

export default function Blog(props: BlogPageProps): ReactElement {
  return <BlogPage {...props} />;
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
    const { entries, total } = await cms.fetchBlogEntriesWithoutDevUpdates(
      CMS.BLOG_RESULTS_PER_PAGE,
      page,
    );

    const pageCount = Math.ceil(total / CMS.BLOG_RESULTS_PER_PAGE);

    return {
      props: {
        posts: entries,
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
  // TODO could use the PageCount calculation from GetStaticProps
  let page = 1;
  let foundAllPosts = false;
  const paths: IPath[] = [{ params: { page: [String(page)] } }];

  // Contentful only allows 100 at a time
  while (!foundAllPosts) {
    const { entries } = await cms.fetchBlogEntries(100, page);

    if (entries.length === 0) {
      foundAllPosts = true;
      continue;
    }

    page++;
    paths.push({ params: { page: [String(page)] } });
  }

  return { paths, fallback: 'blocking' };
};
