import Link from 'next/link';
import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { IPost } from '../../types/cms';
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
      className="overflow-hidden text-base"
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
      className="relative overflow-hidden rounded-lg bg-primary bg-opacity-10"
    >
      {post?.featureImage?.imageUrl && (
        <img
          src={post.featureImage?.imageUrl}
          alt={post.featureImage?.description ?? post.title}
          className="object-cover w-full h-full rounded-lg"
        />
      )}
    </div>
  );

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col w-full mb-6 space-y-4">
          <div className="flex w-full space-x-6">
            <ArticlePreviewImage />
            <div className="w-2/3">
              <h3 className="font-sans text-twoxl text-primary">
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
              <a className="font-sans text-xl text-primary">{post.title}</a>
            </Link>

            <ArticlePreviewContent />
          </div>
        </div>
      )}
    </>
  );
}
