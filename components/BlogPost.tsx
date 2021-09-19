import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { METADATA } from '../constants';
import { PageType, setPageType, setPostTitle } from '../state/navigation';
import { IPost } from '../types/cms';

import { Article } from '../components/article/Article';
import CustomHead from './CustomHead';

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
  }, []);

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
