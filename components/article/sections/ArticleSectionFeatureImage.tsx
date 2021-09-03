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
      <div className="relative flex items-center justify-center w-full h-full">
        <img
          src={featureImage?.imageUrl}
          alt={featureImage?.description ?? title}
          className="object-fill"
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
