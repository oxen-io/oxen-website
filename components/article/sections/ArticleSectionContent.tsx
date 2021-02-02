import React, { useContext } from 'react';
import { ScreenContext } from '../../../contexts/screen';
import { IPost } from '../../../types/blog';
import { Contained } from '../../Contained';
import { ArticleBody } from '../ArticleBody';
import { ArticleSectionFeatureImage } from './ArticleSectionFeatureImage';

export function ArticleSectionContent(post: IPost) {
  const { isDesktop } = useContext(ScreenContext);
  return (
    <Contained>
      {!isDesktop ? <MobileContent {...post} /> : <DesktopContent {...post} />}
    </Contained>
  );
}

const MobileContent = (post: IPost) => {
  return (
    <div className="flex flex-col space-y-4">
      <ArticleSectionFeatureImage featureImage={post.featureImage} />
      <div>
        <ArticleBody body={post.body} />
      </div>
    </div>
  );
};

const DesktopContent = (post: IPost) => {
  return (
    <div className="flex flex-col space-y-10 items-center">
      <ArticleSectionFeatureImage featureImage={post.featureImage} />
      <div className="my-10">
        <ArticleBody body={post.body} />
      </div>
    </div>
  );
};
