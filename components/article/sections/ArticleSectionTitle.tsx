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
      <h1 className="text-4xl leading-none tracking-wide text-center font-prompt text-primary desktop:text-7xl tablet:text-fixexl">
        {title}
      </h1>
    </div>
  );
}
