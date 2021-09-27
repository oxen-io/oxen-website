import { ReactElement, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { IEmbed, INoembed, isNoembed } from '../services/embed';

interface Props {
  content: IEmbed | INoembed; // is sanitized in embed service
  classes?: string;
}

export default function EmbedContent(props: Props): ReactElement {
  const { content, classes } = props;
  const htmlRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isNoembed(content) && null !== htmlRef.current) {
      htmlRef.current.innerHTML = content.html;
    }
  }, [content]);
  if (isNoembed(content)) {
    return (
      <div className={classNames('embed-content', classes)} ref={htmlRef}></div>
    );
  } else {
    return (
      <Link href={content.url}>
        <a target="_blank">
          <div
            className={classNames(
              'embed-content',
              'border border-primary my-6 mx-auto max-w-sm',
              classes,
            )}
          >
            {content.image && (
              <div
                className={classNames('relative w-full h-36', 'tablet:h-48')}
              >
                <Image
                  src={`${content.image}?fm=jpg&fl=progressive`}
                  alt="link thumbnail image"
                  layout="fill"
                  className={classNames('object-cover')}
                  quality={100}
                  priority={true}
                  lazyBoundary={`500px 200px`}
                />
              </div>
            )}
            <div className={classNames('p-3 text-xs', 'tablet:text-sm')}>
              <p
                className={classNames('font-semibold mb-1', 'tablet:mb-2')}
                dangerouslySetInnerHTML={{ __html: content.title }}
              />
              {content.description && (
                <p dangerouslySetInnerHTML={{ __html: content.description }} />
              )}
              {content.site_name && (
                <p
                  className={classNames('text-gray-500 font-normal')}
                  dangerouslySetInnerHTML={{ __html: content.site_name }}
                />
              )}
            </div>
          </div>
        </a>
      </Link>
    );
  }
}
