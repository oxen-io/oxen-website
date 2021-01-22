import BlockContent from '@sanity/block-content-to-react';
import React, { useContext } from 'react';
import { SANITY_CONSTATNTS } from '../../../client';
import { ScreenContext } from '../../../contexts/screen';
import { IArticle } from '../../../types/article';
import { Contained } from '../../Contained';
import { ArticleSectionFeatureImage } from './ArticleSectionFeatureImage';

const paragraphs = [
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, labore consequatur. Architecto, aperiam impedit. Corrupti inventore eius, exercitationem odit est fugit, iste aspernatur incidunt quod iure aliquid fugiat. Earum, voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, labore consequatur. Architecto, aperiam impedit. Corrupti inventore eius, exercitationem odit est fugit, iste aspernatur incidunt quod iure aliquid fugiat. Earum, voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, labore consequatur. Architecto, aperiam impedit. Corrupti inventore eius, exercitationem odit est fugit, iste aspernatur incidunt quod iure aliquid fugiat. Earum, voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, labore consequatur. Architecto, aperiam impedit.', 'Corrupti inventore eius, exercitationem
odit est fugit, iste aspernatur incidunt quod iure aliquid fugiat.
Earum, voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing
elit. Hic, labore consequatur. Architecto, aperiam impedit. Corrupti
inventore eius, exercitationem odit est fugit, iste aspernatur
incidunt quod iure aliquid fugiat. Earum, voluptate. Lorem ipsum,
dolor sit amet consectetur adipisicing elit. Hic, labore consequatur.
Architecto, aperiam impedit. Corrupti inventore eius, exercitationem
odit est fugit, iste aspernatur incidunt quod iure aliquid fugiat.
Earum, voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing
elit. Hic, labore consequatur. Architecto, aperiam impedit. Corrupti
inventore eius, exercitationem odit est fugit, iste aspernatur
incidunt quod iure aliquid fugiat. Earum, voluptate.`,
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, labore
consequatur. Architecto, aperiam impedit. Corrupti inventore eius,
exercitationem odit est fugit, iste aspernatur incidunt quod iure
aliquid fugiat. Earum, voluptate. Lorem ipsum, dolor sit amet
consectetur adipisicing elit. Hic, labore consequatur. Architecto,
aperiam impedit. Corrupti inventore eius, exercitationem odit est
fugit, iste aspernatur incidunt quod iure aliquid fugiat. Earum,
voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
Hic, labore consequatur. Architecto, aperiam impedit. Corrupti
inventore eius, exercitationem odit est fugit, iste aspernatur
incidunt quod iure aliquid fugiat.`,
  `Earum, voluptate. Lorem ipsum,
dolor sit amet consectetur adipisicing elit. Hic, labore consequatur.
Architecto, aperiam impedit. Corrupti inventore eius, exercitationem
odit est fugit, iste aspernatur incidunt quod iure aliquid fugiat.
Earum, voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing
elit. Hic, labore consequatur. Architecto, aperiam impedit. Corrupti
inventore eius, exercitationem odit est fugit, iste aspernatur
incidunt quod iure aliquid fugiat. Earum, voluptate. Lorem ipsum,
dolor sit amet consectetur adipisicing elit. Hic, labore consequatur.
Architecto, aperiam impedit. Corrupti inventore eius, exercitationem
odit est fugit, iste aspernatur incidunt quod iure aliquid fugiat.`,
];

export function ArticleSectionContent(post: IArticle) {
  const { isDesktop } = useContext(ScreenContext);

  return (
    <Contained>
      {isDesktop ? <DesktopContent {...post} /> : <MobileContent {...post} />}
    </Contained>
  );
}

const MobileContent = (post: IArticle) => (
  <div className="flex flex-col space-y-4">
    <div>{paragraphs[0]}</div>

    <BlockContent
      blocks={post.body}
      projectId={SANITY_CONSTATNTS.PROJECT_ID}
      dataset={SANITY_CONSTATNTS.DATASET}
    />

    <ArticleSectionFeatureImage featureImage={post.featureImage} />
  </div>
);

const DesktopContent = (post: IArticle) => (
  <div className="flex flex-col">
    <div className="flex space-x-10">
      <div className="w-8/12 mt-16">
        <BlockContent
          blocks={post.body}
          projectId={SANITY_CONSTATNTS.PROJECT_ID}
          dataset={SANITY_CONSTATNTS.DATASET}
        />
      </div>
    </div>
    <ArticleSectionFeatureImage featureImage={post.featureImage} />
  </div>
);
