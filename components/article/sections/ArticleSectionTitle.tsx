import React from 'react';
import { UI } from '../../../constants';
import { IAuthor } from '../../../types/blog';
import { Contained } from '../../Contained';
import { ArticleWidgetAuthor } from '../widgets/ArticleWidgetAuthor';

interface Props {
  title: string;
  author: IAuthor;
  publishedDate: string;
}

export function ArticleSectionTitle(props: Props) {
  const { title, author, publishedDate } = props;

  return (
    <Contained>
      <div className="flex flex-col items-center space-y-4 mt-16 mb-4">
        <div
          className="flex items-center"
          style={{
            minHeight: '7rem',
            maxWidth: `${UI.ARTICLE.TITLE_MAX_WIDTH_REM}rem`,
          }}
        >
          <h1 className="font-roboto text-primary text-4xl desktop:text-5xl tablet:text-fixexl leading-none text-center">
            {title}
          </h1>
        </div>

        <ArticleWidgetAuthor author={author} publishedDate={publishedDate} />
      </div>
    </Contained>
  );
}
