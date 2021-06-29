import { IFigureImage } from '../../../types/cms';
import { Contained } from '../../Contained';
import { ArticleContained } from '../../ArticleContained';

interface Props {
  featureImage: IFigureImage;
  title: string;
}

export function ArticleSectionFeatureImage({ featureImage, title }: Props) {
  return (
    <div className="w-full pb-4 desktop:pb-0">
      <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-bl from-hyper to-blush">
        <img
          src={featureImage?.imageUrl}
          alt={featureImage?.description ?? title}
          style={{ maxHeight: '65vh', width: '87.5em' }}
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
