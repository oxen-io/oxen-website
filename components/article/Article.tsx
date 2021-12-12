import { ArticleContained } from '@/components/ArticleContained';
import { ArticleSectionContent } from '@/components/article/sections/ArticleSectionContent';
import { ArticleSectionFeatureImage } from '@/components/article/sections/ArticleSectionFeatureImage';
import { ArticleSectionTitle } from '@/components/article/sections/ArticleSectionTitle';
import { ArticleSubtitleSection } from '@/components/article/sections/ArticleSubtitleSection';
import { ArticleWidgetAuthor } from '@/components/article/widgets/ArticleWidgetAuthor';
import { Contained } from '@/components/Contained';
import EmailSignup from '@/components/EmailSignup';
import { IPost } from '@/types/cms';
import React from 'react';
import { Spacer } from '@/components/Spacer';
import { TagRow } from '@/components/TagRow';
import classNames from 'classnames';

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
        <ArticleSectionFeatureImage featureImage={featureImage} title={title} />

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
          <EmailSignup classes={classNames('mt-12', 'tablet:mt-12')} />
        </ArticleContained>
      </div>
    </article>
  );
}
