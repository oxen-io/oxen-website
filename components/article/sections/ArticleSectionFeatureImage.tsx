import Image from 'next/image';

import { IFigureImage } from '../../../types/cms';
import { Contained } from '../../Contained';
import { ArticleContained } from '../../ArticleContained';

interface Props {
  featureImage: IFigureImage;
  title: string;
}

export function ArticleSectionFeatureImage({ featureImage, title }: Props) {
  return (
    <div className="w-full pb-4">
      <div className="relative w-full h-full">
        <Image
          src={featureImage?.imageUrl}
          alt={featureImage?.description ?? title}
          width={featureImage?.width}
          height={featureImage?.height}
          layout="responsive"
        />
      </div>

      {featureImage?.description && (
        <Contained>
          <ArticleContained>
            <div className="pt-2 italic ext-sm">
              {featureImage?.description}
            </div>
          </ArticleContained>
        </Contained>
      )}
    </div>
  );
}
