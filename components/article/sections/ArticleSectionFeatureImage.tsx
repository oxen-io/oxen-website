import { ArticleContained } from '@/components/ArticleContained';
import { Contained } from '@/components/Contained';
import { IFigureImage } from '@/types/cms';
import Image from 'next/image';
import { UI } from '@/constants';

interface Props {
  featureImage: IFigureImage;
  title: string;
}

export function ArticleSectionFeatureImage({ featureImage, title }: Props) {
  return (
    <div className="w-full pb-4">
      <div className="relative w-full h-full">
        <Image
          src={`${featureImage?.imageUrl}`}
          alt={featureImage?.description ?? title}
          width={featureImage?.width}
          height={featureImage?.height}
          layout="responsive"
          quality={100}
          priority={true}
          placeholder="blur"
          blurDataURL={`${featureImage?.imageUrl}?w=${UI.MAX_CONTENT_WIDTH}&q=5`}
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
