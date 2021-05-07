import { IFigureImage } from '../../../types/cms';

interface Props {
  featureImage: IFigureImage;
  title: string;
}

export function ArticleSectionFeatureImage({ featureImage, title }: Props) {
  return (
    <div className="w-full pb-4 desktop:pb-0">
      <div className="relative w-full mb-4 aspect-w-14 aspect-h-8">
        <img
          src={featureImage?.imageUrl}
          alt={featureImage?.description ?? title}
          className="object-cover rounded"
        />
      </div>

      {featureImage?.description && (
        <div className="w-8/12 text-sm italic">{featureImage?.description}</div>
      )}
    </div>
  );
}
