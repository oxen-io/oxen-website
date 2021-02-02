import { useContext } from 'react';
import { ScreenContext } from '../../../contexts/screen';
import { Contained } from '../../Contained';

interface Props {
  subtitle: string;
}

export function ArticleSubtitleSection({ subtitle }: Props) {
  const { isDesktop } = useContext(ScreenContext);

  return (
    <Contained>
      <div className="flex justify-center w-full">
        <span
          style={{
            maxWidth: isDesktop ? '700px' : 'unset',
          }}
          className="text-lg w-full mb-3 desktop:mb-6 desktop:text-2xl text-center font-medium font-roboto text-gray-900"
        >
          {subtitle}
        </span>
      </div>
    </Contained>
  );
}
