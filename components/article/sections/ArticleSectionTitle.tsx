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
      <h1 className="mb-1 text-4xl font-medium leading-none tracking-wide text-center font-prompt text-primary tablet:text-3xl desktop:text-4xl">
        {title}
      </h1>
    </div>
  );
}
