import { METADATA, NAVIGATION } from '@/constants';

import CustomHead from '@/components/CustomHead';
import Image from 'next/image';
import { SideMenuItem } from '@/state/navigation';
import classNames from 'classnames';

function Roadmap() {
  return (
    <>
      <CustomHead
        title={NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.ROADMAP].label}
        metadata={METADATA.ROADMAP_PAGE}
      />
      <div className="w-full h-full">
        <div className="flex flex-col px-6 py-6 space-y-10">
          <div
            className={classNames(
              'relative w-full mx-auto',
              'desktop:max-w-3xl',
            )}
          >
            <Image
              src={`/img/roadmap.webp`}
              alt="Oxen's Roadmap and Plans for the future."
              width={1920}
              height={3528}
              layout="responsive"
              quality={100}
              priority={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Roadmap;
