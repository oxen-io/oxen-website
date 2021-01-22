import React from 'react';
import { UI } from '../../../constants';
import { IAuthor } from '../../../types/article';
import { Contained } from '../../Contained';
import { ArticleWidgetAuthor } from '../widgets/ArticleWidgetAuthor';

interface Props {
  title: string;
  author: IAuthor;
  date: string;
}

export function ArticleSectionTitle(props: Props) {
  const { title, author, date } = props;

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
          <h1 className="font-roboto text-primary text-fourxl desktop:text-fivexl tablet:text-fixexl leading-none text-center">
            {title}
          </h1>
        </div>

        <ArticleWidgetAuthor author={author} date={date} />
      </div>
    </Contained>
  );
}
