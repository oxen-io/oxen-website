/* eslint-disable react/display-name */
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
  Text,
} from '@contentful/rich-text-types';
import React from 'react';

const Bold = ({ children }) => (
  <span className="font-semibold">{children}</span>
);

const Paragraph = ({ children }) => (
  <p className="font-roboto mb-3 tracking-wide">{children}</p>
);

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      return <Paragraph>{children}</Paragraph>;
    },
    [BLOCKS.HEADING_1]: (node: Heading1) => {
      const content = (node.content[0] as Text)?.value;
      return (
        <h1 className="font-semibold text-4xl mt-8 mb-4 font-prompt">
          {content}
        </h1>
      );
    },
    [BLOCKS.HEADING_2]: (node: Heading2) => {
      const content = (node.content[0] as Text)?.value;
      return (
        <h2 className="font-semibold tracking-wide text-3xl mt-8 mb-2 font-roboto">
          {content}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: Heading3) => {
      const content = (node.content[0] as Text)?.value;
      return (
        <h2 className="font-semibold text-xl mt-6 mb-2 font-roboto">
          {content}
        </h2>
      );
    },
    [BLOCKS.HEADING_4]: (node: Heading4) => {
      const content = (node.content[0] as Text)?.value;
      return (
        <h2 className="font-bold text-lg mt-6 mb-2 font-roboto">{content}</h2>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: AssetLinkBlock) => {
      const link = node.data.target.fields.file.url.replace('//', 'http://');

      return <img src={link} />;
    },
    [INLINES.HYPERLINK]: (node: Hyperlink) => {
      const { content } = node;
      console.log('content hyperlink', node);
      return (
        <a
          className="text-blue cursor-pointer hover:underline"
          href={node.data.uri}
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

export function ArticleBody({ body }: Props) {
  const articleBody = documentToReactComponents(body, options);

  return <>{articleBody}</>;
}
