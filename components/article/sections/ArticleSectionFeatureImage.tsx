import { IFigureImage } from '../../../types/cms';

interface Props {
  featureImage: IFigureImage;
  title: string;
}

export function ArticleSectionFeatureImage({ featureImage, title }: Props) {
  return (
    <div className="w-full pb-4 desktop:pb-0">
      <div className="relative w-full max-h-full mb-4 md:max-h-screen">
        <img
          src={featureImage?.imageUrl}
          alt={featureImage?.description ?? title}
          className="object-fill"
        />
      </div>

      {featureImage?.description && (
        <div className="w-8/12 pl-2 text-sm italic">
          {featureImage?.description}
        </div>
      )}
    </div>
  );
}
