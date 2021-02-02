import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { IPost } from '../../types/blog';
import { Contained } from '../Contained';
import { ArticleSectionContent } from './sections/ArticleSectionContent';
import { ArticleSectionTitle } from './sections/ArticleSectionTitle';
import { ArticleSubtitleSection } from './sections/ArticleSubtitleSection';
import { ArticleWidgetAuthor } from './widgets/ArticleWidgetAuthor';

export function Article(props: IPost) {
  const { isMobile } = useContext(ScreenContext);

  return (
    <div>
      {isMobile ? <ArticleMobile {...props} /> : <ArticleDesktop {...props} />}
    </div>
  );
}

function ArticleMobile(props: IPost) {
  const { id, title, slug, subtitle, author, publishedDate } = props;

  return (
    <article>
      <Contained>
        <div className="flex flex-col items-center space-y-6 mt-12 mb-6">
          <ArticleSectionTitle title={title} />
          <ArticleWidgetAuthor author={author} publishedDate={publishedDate} />
          <ArticleSubtitleSection subtitle={subtitle} />
        </div>
      </Contained>
      <ArticleSectionContent {...props} />
    </article>
  );
}

function ArticleDesktop(props: IPost) {
  const { title, subtitle, author, publishedDate } = props;

  return (
    <article>
      <div className="flex flex-col items-center space-y-4 mt-20 mb-10">
        <ArticleSectionTitle title={title} />
        <ArticleWidgetAuthor author={author} publishedDate={publishedDate} />
        <ArticleSubtitleSection subtitle={subtitle} />
      </div>
      <ArticleSectionContent {...props} />
    </article>
  );
}
