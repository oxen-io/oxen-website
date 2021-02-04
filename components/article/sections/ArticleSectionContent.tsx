import React, { useContext } from 'react';
import { ScreenContext } from '../../../contexts/screen';
import { IPost } from '../../../types/cms';
import { Contained } from '../../Contained';
import { RichBody } from '../../RichBody';
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
        <RichBody body={post.body} />
      </div>
    </div>
  );
};

const DesktopContent = (post: IPost) => {
  return (
    <div className="flex flex-col items-center space-y-10">
      <ArticleSectionFeatureImage featureImage={post.featureImage} />
      <div className="my-10">
        <RichBody body={post.body} />
      </div>
    </div>
  );
};
