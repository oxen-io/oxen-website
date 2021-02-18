import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { IPost } from '../../types/cms';
import { generateURL } from '../../utils/routing';
import { TagRow } from '../TagRow';

export function ArticleCardFeature(props: IPost) {
  const {
    featureImage,
    title,
    subtitle,
    description,
    author,
    publishedDate,
    tags,
    slug,
  } = props;

  // Side menu behaviour
  // Blog keeps the title

  const { href, as } = generateURL(slug);
  const { isMobile, isTablet } = useContext(ScreenContext);

  const router = useRouter();
  const onClick = () => router.push(href, as);

  return (
    <div className="flex flex-col w-full space-x-0 tablet:space-x-6 tablet:flex-row">
      <div className="w-full tablet:w-7/12 relatvie">
        <div
          onClick={onClick}
          style={{ minHeight: '100%' }}
          className="bg-opacity-25 cursor-pointer bg-primary aspect-w-14 aspect-h-8"
        >
          <img
            className="object-cover"
            src={`${featureImage?.imageUrl}?w=600`}
          />
        </div>
      </div>

      <div
        style={{ marginTop: isMobile || isTablet ? '1rem' : '0' }}
        className="flex flex-col justify-between w-full tablet:w-5/12"
      >
        <div className="flex flex-col space-y-3">
          <Link href={href} as={as}>
            <a
              style={{ height: '2.95em' }}
              className="overflow-hidden font-sans text-3xl font-medium leading-none hover:underline"
            >
              {title} and other sutff thatfills u pthe title for lots of lines
              and lots more lines and heaps of lines
            </a>
          </Link>

          <div className="flex-grow overflow-hidden">
            <p
              style={{ maxHeight: '7.25em' }}
              className="overflow-hidden text-sm leading-tight"
            >
              {description?.substring(0, 250)}...
            </p>
          </div>
        </div>

        <div className="relative">
          <p className="mt-3 mb-2 font-sans text-xs font-thin">
            {publishedDate} — {author?.name}
          </p>

          <TagRow tags={tags} limit={3} />
        </div>
      </div>
    </div>
  );
}
