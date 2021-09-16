import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';

import { CMS } from '../../constants';
import { CmsApi } from '../../services/cms';

import BlogPage, { BlogPageProps } from '../../components/BlogPage';

export default function Blog(props: BlogPageProps): ReactElement {
  return <BlogPage {...props} />;
}
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const cms = new CmsApi();
  const page = 1;

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
