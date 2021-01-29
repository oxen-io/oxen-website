import React, { useContext } from 'react';
import { ScreenContext } from '../../../contexts/screen';
import { IPost } from '../../../types/blog';
import { Contained } from '../../Contained';
import { ArticleSectionFeatureImage } from './ArticleSectionFeatureImage';

export function ArticleSectionContent(post: IPost) {
  const { isDesktop } = useContext(ScreenContext);

  return (
    <Contained>
      {isDesktop ? <DesktopContent {...post} /> : <MobileContent {...post} />}
    </Contained>
  );
}

const MobileContent = (post: IPost) => (
  <div className="flex flex-col space-y-4">
    <div>{post.body}</div>

    <ArticleSectionFeatureImage featureImage={post.featureImage} />
  </div>
);

const DesktopContent = (post: IPost) => (
  <div className="flex flex-col">
    <div className="flex space-x-10">
      <div className="w-8/12 mt-16">{post.body}</div>
    </div>
    <ArticleSectionFeatureImage featureImage={post.featureImage} />
  </div>
);
