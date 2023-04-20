import { PageType, setPageType, setPostTitle } from '@/state/navigation';

import { Article } from '@/components/article/Article';
import CustomHead from '@/components/CustomHead';
import { IPost } from '@/types/cms';
import { METADATA } from '@/constants';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

interface Props {
  post: IPost;
}

// Parallax on bg as mouse moves
export default function BlogPost(props: Props) {
  const { post } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      dispatch(setPageType(PageType.POST));
      dispatch(setPostTitle(post.title));
    }
  }, [dispatch, post]);

  return (
    <>
      <CustomHead
        title={post?.title}
        metadata={{
          TYPE: METADATA.BLOG_PAGE.TYPE,
          DESCRIPTION: post?.description,
          OG_IMAGE: {
            URL: post?.featureImage.imageUrl ?? METADATA.OG_IMAGE.URL,
            WIDTH: Number(post?.featureImage?.width) ?? METADATA.OG_IMAGE.WIDTH,
            HEIGHT:
              Number(post?.featureImage?.height) ?? METADATA.OG_IMAGE.HEIGHT,
            ALT: post?.featureImage?.title ?? METADATA.OG_IMAGE.ALT,
          },
          TAGS: post.tags,
          ARTICLE_SECTION: post.tags[0],
          PUBLISHED_TIME: post.publishedDateISO,
        }}
      />
      <div className="bg-alt">
        <Article {...post} />
      </div>
    </>
  );
}
