import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { IPost } from '../../types/blog';
import { ArticleSectionAbstract } from './sections/ArticleSectionAbstract';
import { ArticleSectionContent } from './sections/ArticleSectionContent';
import { ArticleSectionTitle } from './sections/ArticleSectionTitle';
import { ArticleSubtitleSection } from './sections/ArticleSubtitleSection';

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
      <ArticleSectionTitle title={title} author={author} date={date} />
      <ArticleSubtitleSection subtitle={subtitle} />

      <ArticleSectionAbstract
        city={city}
        location={location}
      ></ArticleSectionAbstract>
      <ArticleSectionContent {...props} />
    </article>
  );
}

function ArticleDesktop(props: IPost) {
  const { id, title, description, author, publishedDate, slug } = props;

  return (
    <article>
      <ArticleSectionTitle
        title={title}
        author={author}
        publishedDate={publishedDate}
      />
      <ArticleSectionAbstract>
        <ArticleSubtitleSection subtitle={description} />
      </ArticleSectionAbstract>
      <ArticleSectionContent {...props} />
    </article>
  );
}
