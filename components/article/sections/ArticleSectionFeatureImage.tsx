import { IFigureImage } from '../../../types/blog';

interface Props {
  featureImage: IFigureImage;
}

export function ArticleSectionFeatureImage({ featureImage }: Props) {
  return (
    <div className="pb-4 w-full desktop:pb-0">
      <div
        style={{ paddingBottom: '40%' }}
        className="relative w-full h-0 mb-4 bg-gray-300 rounded-md overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={featureImage.imageUrl}
            alt={featureImage.description ?? ''}
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
          />
        </div>
      </div>

      {featureImage?.description && (
        <div className="w-8/12 italic text-sm">{featureImage.description}</div>
      )}
    </div>
  );
}
