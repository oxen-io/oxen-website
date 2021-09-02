import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { Block, Inline } from '@contentful/rich-text-types';
import sanitize from '../utils/sanitize';

import EmbedContent from '../components/EmbedContent';
import { ScreenContext } from '../contexts/screen';
import { ReactElement } from 'react';

function Markup(node: any): ReactElement {
  const frontTags: string[] = [];
  const endTags: string[] = [];
  const styles: any = {};

  if (node.color) {
    styles.color = sanitize(node.color);
  }

  frontTags.push(
    node.strikethrough && '<s>',
    node.subscript && '<sub>',
    node.superscript && '<sup>',
  );
  endTags.push(
    node.strikethrough && '</s>',
    node.subscript && '</sub>',
    node.superscript && '</sup>',
  );

  let htmlContent = frontTags.join('') + node.content + endTags.join('');
  htmlContent = sanitize(htmlContent);
  return (
    <span dangerouslySetInnerHTML={{ __html: htmlContent }} style={styles} />
  );
}

function EmbeddedLink(node: any, isInline = false): ReactElement {
  const figureClasses = [
    isInline && node.position === 'left' && 'md:float-left',
    isInline && node.position === 'right' && 'md:float-right',
    isInline && node.position && 'md:w-3/5 lg:w-1/2',
  ];
  const inlineClasses = [
    isInline && !node.position && 'inline-block align-middle mx-1',
  ];
  const captionClasses = [...inlineClasses, !isInline && 'pb-4'];
  return (
    <figure className={classNames(figureClasses)}>
      <EmbedContent content={node.meta} classes={classNames(inlineClasses)} />
      {node.caption && (
        <figcaption className={classNames(captionClasses)}>
          <em>{node.caption}</em>
        </figcaption>
      )}
    </figure>
  );
}

function EmbeddedMedia(node: any, isInline = false): ReactElement {
  const { isMobile, isTablet } = useContext(ScreenContext);
  // is either an asset or entry
  const media = node.file.fields ?? node;
  const url = media.file.url.replace('//', 'https://');
  if (
    media.file.contentType === 'image/jpeg' ||
    media.file.contentType === 'image/png' ||
    media.file.contentType === 'image/gif'
  ) {
    const imageWidth = node.width ?? media.file.details.image.width;
    const imageHeight = node.height ?? media.file.details.image.height;
    const figureClasses = [
      isInline && node.position && 'mx-auto mb-5',
      isInline && !node.position && 'inline-block align-middle mx-1',
      isInline && node.position === 'left' && 'md:float-left',
      isInline && node.position === 'right' && 'md:float-right',
      !isInline && 'text-center mb-5',
    ];
    const captionClasses = [
      !node.position && 'mt-1',
      isInline &&
        !node.position &&
        'text-center md:inline-block md:align-middle md:mx-1',
    ];
    return (
      <figure
        className={classNames(figureClasses)}
        style={{ width: node.position ? imageWidth : '', maxWidth: '800px' }}
      >
        <Image
          src={`${url}${isMobile ? '?w=300' : isTablet ? '?w=600' : ''}`}
          alt={node.title}
          width={imageWidth}
          height={imageHeight}
        />
        {node.caption && (
          <figcaption className={classNames(captionClasses)}>
            <em>
              {node.sourceUrl ? (
                <Link href={node.sourceUrl}>
                  <a
                    aria-label={node.caption}
                    className={classNames('font-extralight')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {node.caption}
                  </a>
                </Link>
              ) : (
                <>{node.caption}</>
              )}
            </em>
          </figcaption>
        )}
      </figure>
    );
  } else {
    return <></>;
  }
}

interface IEmbedEntry {
  node: Block | Inline;
  isInline?: boolean;
}

export function renderEmbeddedEntry(props: IEmbedEntry) {
  const { node, isInline = false } = props;
  const target = node.data.target;
  const asset = target.fields;
  if (target.sys.contentType && target.sys.contentType.sys.id === 'markup') {
    return Markup(asset);
  }
  if (!asset.file) {
    return EmbeddedLink(asset, isInline);
  } else {
    return EmbeddedMedia(asset, isInline);
  }
}
