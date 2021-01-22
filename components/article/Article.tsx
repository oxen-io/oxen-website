import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { IArticle } from '../../types/article';
import { ArticleSectionAbstract } from './sections/ArticleSectionAbstract';
import { ArticleSectionContent } from './sections/ArticleSectionContent';
import { ArticleSectionTitle } from './sections/ArticleSectionTitle';
import { ArticleSubtitleSection } from './sections/ArticleSubtitleSection';

export function Article(props: IArticle) {
  const { isMobile } = useContext(ScreenContext);

  return (
    <div>
      {isMobile ? <ArticleMobile {...props} /> : <ArticleDesktop {...props} />}
    </div>
  );
}

function ArticleMobile(props: IArticle) {
  const { id, title, slug, subtitle, author, date, city, location } = props;

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

function ArticleDesktop(props: IArticle) {
  const { id, title, subtitle, author, date, slug, city, location } = props;

  return (
    <article>
      <ArticleSectionTitle title={title} author={author} date={date} />
      <ArticleSectionAbstract city={city} location={location}>
        <ArticleSubtitleSection subtitle={subtitle} />
      </ArticleSectionAbstract>
      <ArticleSectionContent {...props} />
    </article>
  );
}
