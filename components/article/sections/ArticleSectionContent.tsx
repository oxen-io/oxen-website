import React, { useContext } from 'react';
import { ScreenContext } from '../../../contexts/screen';
import { IPost } from '../../../types/cms';
import { RichBody } from '../../RichBody';

export function ArticleSectionContent(post: IPost) {
  const { isDesktop } = useContext(ScreenContext);
  return (
    <>
      {!isDesktop ? <MobileContent {...post} /> : <DesktopContent {...post} />}
    </>
  );
}

const MobileContent = (post: IPost) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      <div>
        <RichBody body={post.body} />
      </div>
    </div>
  );
};

const DesktopContent = (post: IPost) => {
  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="w-full">
        <RichBody body={post.body} />
      </div>
    </div>
  );
};
