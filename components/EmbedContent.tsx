import { IEmbed, INoembed, isNoembed } from '@/services/embed';
import { ReactElement, useEffect, useRef, useState } from 'react';

import { Button } from './Button';
import Image from 'next/image';
import Link from 'next/link';
import { TOS } from '@/constants';
import classNames from 'classnames';

interface Props {
  content: IEmbed | INoembed; // is sanitized in embed service
  classes?: string;
}

export default function EmbedContent(props: Props): ReactElement {
  const { content, classes } = props;
  const htmlRef = useRef<HTMLDivElement>(null);
  const [allowExternalContent, setAllowExternalContent] = useState(false);

  useEffect(() => {
    if (isNoembed(content) && null !== htmlRef.current) {
      htmlRef.current.innerHTML = content.html;
    }
    if (allowExternalContent) {
      if (isNoembed(content) && null !== htmlRef.current) {
        htmlRef.current.innerHTML = content.html;
      }
    }
  }, [allowExternalContent, content]);

  if (isNoembed(content)) {
    if (content.isExternalVideo) {
      return allowExternalContent ? (
        <div
          className={classNames('embed-content', classes)}
          ref={htmlRef}
        ></div>
      ) : (
        <div
          className={classNames(
            'embed-content w-full border border-primary my-6 mx-auto max-w-sm p-6',
          )}
        >
          <p
            className={classNames(
              'text-sm font-semibold mb-2 leading-relaxed',
              'tablet:text-base',
            )}
          >
            This content is hosted by {content.site_name}.
          </p>
          <p
            className={classNames(
              'text-xs font-normal leading-relaxed mb-4',
              'tablet:text-sm',
            )}
          >
            By showing the external content you accept their{' '}
            {TOS[content.site_name] && TOS[content.site_name].length > 0 ? (
              <a
                href={TOS[content.site_name]}
                target="_blank"
                rel="noreferrer"
                className={classNames('text-primary font-semibold')}
              >
                Terms and Conditions
              </a>
            ) : (
              'Terms and Conditions'
            )}
            .
          </p>
          <Button
            size="large"
            onClick={() => {
              setAllowExternalContent(true);
            }}
            className={'block ml-auto'}
          >
            Show
          </Button>
        </div>
      );
    } else {
      return (
        <div
          className={classNames('embed-content', classes)}
          ref={htmlRef}
        ></div>
      );
    }
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
                  src={`${content.image}`}
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
