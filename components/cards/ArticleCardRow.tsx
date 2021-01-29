import Link from 'next/link';
import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { IPost } from '../../types/blog';
import { generateURL } from '../../utils/routing';

export function ArticleCardRow(post: IPost) {
  const { isMobile } = useContext(ScreenContext);
  const { slug, tags } = post;
  const { href, as } = generateURL(slug);

  const ArticlePreviewContent = () => (
    <p
      style={{
        lineHeight: '1.33em',
        height: '4em',
      }}
      className="text-base overflow-hidden"
    >
      {post.subtitle}
    </p>
  );

  const ArticlePreviewImage = () => (
    <div
      style={{
        width: isMobile ? '33%' : '10rem',
        height: isMobile ? '66%' : '6rem',
      }}
      className="relative rounded-lg bg-primary bg-opacity-10 overflow-hidden"
    >
      {post?.featureImage?.imageUrl && (
        <img
          src={post.featureImage.imageUrl}
          alt={post.featureImage.description}
          className="w-full h-full rounded-lg object-cover"
        />
      )}
    </div>
  );

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col w-full space-y-4 mb-6">
          <div className="flex w-full space-x-6">
            <ArticlePreviewImage />
            <div className="w-2/3">
              <h3 className="font-roboto text-twoxl text-primary">
                {post.title}
              </h3>
            </div>
          </div>

          <ArticlePreviewContent />
        </div>
      ) : (
        <div className="flex w-full space-x-6">
          <ArticlePreviewImage />
          <div
            style={{ width: 'min-content' }}
            className="flex flex-col flex-grow"
          >
            <Link href={href} as={as}>
              <a className="font-roboto text-xl text-primary">{post.title}</a>
            </Link>

            <ArticlePreviewContent />
          </div>
        </div>
      )}
    </>
  );
}
