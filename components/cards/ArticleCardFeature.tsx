import { IPost } from '@/types/cms';
import Image from 'next/image';
import Link from 'next/link';
import { ScreenContext } from '@/contexts/screen';
import { TagRow } from '@/components/TagRow';
import classNames from 'classnames';
import { generateURL } from '@/utils/routing';
import { useContext } from 'react';
import { useRouter } from 'next/router';

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
      <div className="w-full tablet:w-7/12">
        <div
          onClick={onClick}
          className={classNames(
            'relative bg-opacity-25 cursor-pointer bg-primary min-h-full aspect-w-16 aspect-h-8',
          )}
        >
          <Image
            src={`${featureImage?.imageUrl}?w=1200`}
            alt={featureImage?.description ?? title}
            layout="fill"
            quality={100}
            priority={true}
            className="object-cover"
          />
        </div>
      </div>

      <div
        style={{ marginTop: isMobile || isTablet ? '1rem' : '0' }}
        className="flex flex-col justify-between w-full text-primary tablet:w-5/12"
      >
        <div className="flex flex-col space-y-3">
          <Link href={href} as={as}>
            <a
              style={{ height: '2.95em' }}
              className="overflow-hidden font-sans text-3xl font-medium leading-none hover:underline"
            >
              {title}
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
