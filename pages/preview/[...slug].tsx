import { CmsApi, generateLinkMeta, unslugify } from '@/services/cms';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IPost, ISplitPage, isPost } from '@/types/cms';

import BlogPost from '@/components/BlogPost';
import Link from 'next/link';
import { ReactElement } from 'react';
import RichPage from '@/components/RichPage';
import { SideMenuItem } from '@/state/navigation';

export interface Props {
  page: ISplitPage | IPost;
  slug: string;
}

export default function Preview(props: Props): ReactElement {
  const { page, slug } = props;
  return (
    <>
      <div
        className={
          'bg-primary text-white font-semibold w-full py-4 px-8 flex justify-between'
        }
      >
        <span>Preview Mode</span>
        <Link href={`/${slug}`}>
          <a>Exit</a>
        </Link>
      </div>
      {isPost(page) ? <BlogPost post={page} /> : <RichPage page={page} />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const slug = context.params?.slug.toString().split(',').join('/') ?? '';
  const id = unslugify(slug);
  console.log(`Loading Preview %c${slug}`, 'color: purple;');
  try {
    const cms = new CmsApi();
    let page: ISplitPage | IPost;

    if (SideMenuItem[id]) {
      page = await cms.fetchEntryPreview(SideMenuItem[id], 'splitPage');
    } else {
      let query = slug;
      if (slug.indexOf('blog/') >= 0) query = slug.split('blog/')[1];
      page = await cms.fetchEntryPreview(query, 'post');
      // embedded links in post body need metadata for preview
      page.body = await generateLinkMeta(page.body);
    }

    console.log(`Built Preview %c${slug}`, 'color: purple;');
    return {
      props: {
        page,
        slug,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};
