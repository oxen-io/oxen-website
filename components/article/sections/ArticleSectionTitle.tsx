import React from 'react';
import { UI } from '../../../constants';

interface Props {
  title: string;
}

export function ArticleSectionTitle(props: Props) {
  const { title } = props;

  return (
    <div
      style={{
        maxWidth: `${UI.ARTICLE.TITLE_MAX_WIDTH_REM}rem`,
      }}
    >
      <h1 className="font-prompt text-primary text-4xl desktop:text-7xl tablet:text-fixexl tracking-wide leading-none text-center">
        {title}
      </h1>
    </div>
  );
}
