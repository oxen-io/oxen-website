import React, { ReactNode } from 'react';
import { UI } from '../constants';

interface Props {
  children: ReactNode;
}

export function ArticleContained(props: Props) {
  const { children } = props;

  const containerStyle = {
    paddingLeft: `calc(${UI.PAGE_CONTAINED_PADDING_VW}vw + 2rem)`,
    paddingRight: `calc(${UI.PAGE_CONTAINED_PADDING_VW}vw + 2rem)`,
    width: '100%',
    maxWidth: `${UI.MAX_ARTICLE_WIDTH}px`,
    margin: '0 auto',
  };

  return (
    <div className="relative" style={containerStyle}>
      {children}
    </div>
  );
}
