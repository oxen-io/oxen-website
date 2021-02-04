import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { IPost } from '../../types/cms';
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
        <div className="flex flex-col items-center mt-12 mb-6 space-y-6">
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
      <div className="flex flex-col items-center mt-20 mb-10 space-y-4">
        <ArticleSectionTitle title={title} />
        <ArticleWidgetAuthor author={author} publishedDate={publishedDate} />
        <ArticleSubtitleSection subtitle={subtitle} />
      </div>
      <ArticleSectionContent {...props} />
    </article>
  );
}
