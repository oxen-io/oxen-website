import React from 'react';
import { IPost } from '../../types/cms';
import { ArticleContained } from '../ArticleContained';
import { Contained } from '../Contained';
import { Spacer } from '../Spacer';
import { TagRow } from '../TagRow';
import { ArticleSectionContent } from './sections/ArticleSectionContent';
import { ArticleSectionFeatureImage } from './sections/ArticleSectionFeatureImage';
import { ArticleSectionTitle } from './sections/ArticleSectionTitle';
import { ArticleSubtitleSection } from './sections/ArticleSubtitleSection';
import { ArticleWidgetAuthor } from './widgets/ArticleWidgetAuthor';

export function Article(props: IPost) {
  const {
    title,
    subtitle,
    author,
    tags,
    publishedDate,
    featureImage,
    description,
  } = props;

  // const { isMobile } = useContext(ScreenContext);

  return (
    <article>
      <div className="flex flex-col items-center mt-10 mb-16 space-y-4">
        <Contained>
          <ArticleSectionFeatureImage
            featureImage={featureImage}
            title={title}
          />
        </Contained>

        <ArticleContained>
          <div className="flex flex-col mb-6 space-y-6">
            <ArticleSectionTitle title={title} />
            <ArticleSubtitleSection subtitle={subtitle} />

            <ArticleWidgetAuthor
              author={author}
              publishedDate={publishedDate}
            />

            {/* Brendan requested that descriptions are only shown on cards. -t 2nd Mar 2021 */}
            {/* <ArticleCallout>{description}</ArticleCallout> */}
          </div>

          <ArticleSectionContent {...props} />

          <Spacer spaceY={4} />
          <TagRow tags={tags} size="medium" />
        </ArticleContained>
      </div>
    </article>
  );
}
