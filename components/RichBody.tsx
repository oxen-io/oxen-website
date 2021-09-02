/* eslint-disable react/display-name */
import { cloneElement, Children, ReactElement } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { isLocal, hasLocalID } from '../utils/links';
import { renderEmbeddedEntry } from '../services/render';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { CMS } from '../constants';
import { renderShortcode } from '../services/cms';
import { ArticleCallout } from './article/ArticleCallout';

interface Props {
  body: Document;
  headingClasses?: string; // custom h1-h4 styles
  classes?: string; // custom styles for regular text (color, font weight, etc.)
}

export function RichBody(props: Props): ReactElement {
  const { body, headingClasses, classes } = props;
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: text => (
        <span>
          <strong className="font-semibold">{text}</strong>
        </span>
      ),
      [MARKS.ITALIC]: text => (
        <span>
          <em className="italic">{text}</em>
        </span>
      ),
      [MARKS.UNDERLINE]: text => (
        <span className={classNames('underline')}>{text}</span>
      ),
      [MARKS.CODE]: text => (
        <code className={classNames('tracking-wide bg-primary text-alt px-4')}>
          {text}
        </code>
      ),
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const plaintext = documentToPlainTextString(node);
        const url =
          node.data.uri.indexOf('://oxen.io') >= 0
            ? node.data.uri.split('://oxen.io')[1]
            : node.data.uri;
        return (
          <Link href={url} scroll={!isLocal(node.data.uri)}>
            <a
              aria-label={'Read more about this link'}
              className={classNames('cursor-pointer text-blue hover:underline')}
              target={
                isLocal(node.data.uri) || url !== node.data.uri
                  ? '_self'
                  : '_blank'
              }
              rel="noreferrer"
            >
              {plaintext.trim()}
            </a>
          </Link>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        return renderEmbeddedEntry({ node, isInline: true });
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        // Grab shortcodes
        // const children;
        const plaintext = documentToPlainTextString(node);
        const isShortcode = CMS.SHORTCODE_REGEX.test(plaintext);

        return isShortcode ? (
          renderShortcode(plaintext)
        ) : (
          <p
            className={classNames('mb-3 font-sans tracking-wide text-justify')}
          >
            {children}
          </p>
        );
      },
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1
          id={hasLocalID(node)}
          className={classNames(
            'mt-8 mb-4 text-4xl font-semibold font-prompt',
            headingClasses,
          )}
        >
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2
          id={hasLocalID(node)}
          className={classNames(
            'mt-8 mb-2 font-sans text-3xl font-semibold tracking-wide',
            headingClasses,
          )}
        >
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3
          id={hasLocalID(node)}
          className={classNames(
            'mt-6 mb-2 font-sans text-xl font-semibold',
            headingClasses,
          )}
        >
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4
          id={hasLocalID(node)}
          className={classNames(
            'mt-6 mb-2 font-sans text-lg font-bold',
            headingClasses,
          )}
        >
          {children}
        </h4>
      ),
      // TODO
      // [BLOCKS.HR]: (node, children) => (
      //   <hr className={classNames('border-gray-300 w-24 mx-auto pb-6')} />
      // ),
      [BLOCKS.OL_LIST]: (node, children) => {
        return <ol className="list-decimal">{children}</ol>;
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        return <ul className="ml-6 list-disc">{children}</ul>;
      },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        const renderChildren = Children.map(children, (child: any) => {
          if (child.type === 'p') {
            const newProps = {
              ...child.props,
              className: 'mb-3 font-sans tracking-wide text-justify',
            };
            return cloneElement(child, newProps);
          }
        });
        return <li>{renderChildren}</li>;
      },
      [BLOCKS.QUOTE]: (node, children) => (
        <div className="mt-6">
          <ArticleCallout bold indent>
            <p
              className={classNames(
                'mb-3 font-sans tracking-wide text-justify',
              )}
            >
              {children}
            </p>
          </ArticleCallout>
        </div>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        return renderEmbeddedEntry({ node });
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        return renderEmbeddedEntry({ node });
      },
    },
  };

  const richBody = documentToReactComponents(body, options);
  return <div className={classNames('text-primary', classes)}>{richBody}</div>;
}
