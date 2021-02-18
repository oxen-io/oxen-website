import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useMeasure } from 'react-use';
import { IPost } from '../../types/cms';
import { generateURL } from '../../utils/routing';
import { TagRow } from '../TagRow';

export function ArticleCard(props: IPost): JSX.Element {
  const {
    title,
    description,
    subtitle,
    featureImage,
    publishedDate,
    author,
    tags,
    slug,
  } = props;

  const router = useRouter();
  const [ref, { width }] = useMeasure();
  const isSmall = width < 130;

  const { href, as } = generateURL(slug);

  return (
    <div
      ref={ref}
      className={classNames(
        'overflow-hidden w-full bg-opacity-75',
        isSmall ? 'pb-3' : 'pb-1',
      )}
    >
      <div
        onClick={() => router.push(href, as)}
        className="relative aspect-w-16 aspect-h-9"
      >
        {featureImage?.imageUrl && (
          <img
            className="object-cover cursor-pointer"
            src={`${featureImage?.imageUrl}?w=300`}
            alt={featureImage?.description}
          />
        )}
      </div>

      <div>
        <div className={isSmall ? 'py-1' : 'py-3'}>
          <Link href={href} as={as}>
            <a>
              <p
                style={{
                  maxHeight: '2em',
                }}
                className={classNames(
                  isSmall ? 'text-base' : 'text-lg',
                  'font-sans overflow-hidden cursor-pointer mb-3 hover:underline leading-none text-primary',
                )}
              >
                {title}
              </p>
            </a>
          </Link>

          <p
            style={{
              height: '4em',
              paddingBottom: '2.1em',
            }}
            className="mt-1 overflow-hidden text-xs leading-none text-gray-800"
          >
            {description?.substr(0, 250) ?? subtitle}...
          </p>

          <div className="flex flex-col space-y-1">
            <p className="mt-2 font-sans text-xs text-gray-800">
              {publishedDate} — {author?.name}
            </p>
            <TagRow tags={tags} limit={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
