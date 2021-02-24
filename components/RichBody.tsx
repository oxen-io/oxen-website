/* eslint-disable react/display-name */
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  AssetLinkBlock,
  BLOCKS,
  Document,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Hyperlink,
  INLINES,
  MARKS,
  OrderedList,
  Text,
  UnorderedList,
} from '@contentful/rich-text-types';
import React, { ReactNode } from 'react';
import { CMS } from '../constants';
import { renderShortcode } from '../services/cms';
import { ArticleCallout } from './article/ArticleCallout';

const Bold = ({ children }) => (
  <span className="font-semibold">{children}</span>
);

const Paragraph = ({ children }) => (
  <p className="mb-3 font-sans tracking-wide">{children}</p>
);

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      // Grab shortcodes
      // const children;
      const plaintext = documentToPlainTextString(node);
      const isShortcode = CMS.SHORTCODE_REGEX.test(plaintext);

      return isShortcode ? (
        renderShortcode(plaintext)
      ) : (
        <Paragraph>{children}</Paragraph>
      );
    },
    [BLOCKS.HEADING_1]: (node: Heading1) => {
      const content = (node.content[0] as Text)?.value;
      return (
        <h1 className="mt-8 mb-4 text-4xl font-semibold font-prompt">
          {content}
        </h1>
      );
    },
    [BLOCKS.HEADING_2]: (node: Heading2) => {
      const content = (node.content[0] as Text)?.value;
      return (
        <h2 className="mt-8 mb-2 font-sans text-3xl font-semibold tracking-wide">
          {content}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: Heading3) => {
      const content = (node.content[0] as Text)?.value;
      return (
        <h2 className="mt-6 mb-2 font-sans text-xl font-semibold">{content}</h2>
      );
    },
    [BLOCKS.HEADING_4]: (node: Heading4) => {
      const content = (node.content[0] as Text)?.value;
      return (
        <h2 className="mt-6 mb-2 font-sans text-lg font-bold">{content}</h2>
      );
    },
    [BLOCKS.QUOTE]: (_node, children: ReactNode) => {
      return (
        <div className="mt-6">
          <ArticleCallout bold indent>
            <Paragraph>{children}</Paragraph>{' '}
          </ArticleCallout>
        </div>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: AssetLinkBlock) => {
      const link = (node.data.target as any).fields.file.url.replace(
        '//',
        'https://',
      );

      return (
        <div className="flex justify-center w-full mb-6">
          <img
            style={{ maxWidth: '800px' }}
            className="object-cover w-full"
            src={link}
          />
        </div>
      );
    },
    [BLOCKS.UL_LIST]: (node: UnorderedList, children: JSX.Element[]) => {
      return (
        <ul className="ml-6 list-disc">
          {children.map(item => (
            <li key={item.key}>{item}</li>
          ))}
        </ul>
      );
    },
    [BLOCKS.OL_LIST]: (node: OrderedList, children: JSX.Element[]) => {
      return (
        <ol className="list-decimal">
          {children.map(item => (
            <li key={item.key}>{item}</li>
          ))}
        </ol>
      );
    },
    [INLINES.HYPERLINK]: (node: Hyperlink) => {
      const { content } = node;
      return (
        <a
          className="cursor-pointer text-blue hover:underline"
          href={node.data.uri}
          target="_blank"
          rel="noreferrer"
        >
          {content[0].value}
        </a>
      );
    },
  },
};

interface Props {
  body: Document;
}

// Renders a rich text body
export function RichBody({ body }: Props) {
  const RichBody = documentToReactComponents(body, options);

  return <div className="text-primary">{RichBody}</div>;
}
