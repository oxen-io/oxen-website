import Image from 'next/image';
import { useMeasure } from 'react-use';

import { NAVIGATION, METADATA } from '../constants';
import { SideMenuItem } from '../state/navigation';

import CustomHead from '../components/CustomHead';

function Roadmap() {
  const [ref, { width, height }] = useMeasure();
  const aspectRatio = width / height;

  // Control the aspect ratio of the page images
  const horizontal = width > 600 && aspectRatio > 0.65;

  console.log('roadmap ➡️ horizontal:', horizontal);

  console.log('roadmap ➡️ height:', height);
  console.log('roadmap ➡️ width:', width);
  console.log('roadmap ➡️ ratio:', aspectRatio);

  return (
    <>
      <CustomHead
        title={NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.ROADMAP].label}
        metadata={METADATA.ROADMAP_PAGE}
      />
      <div className="mx-4">
        <div className="flex items-center justify-center mt-8">
          <div className="relative w-full" style={{ height: '90%' }}>
            <Image
              src={`/img/roadmap-${horizontal ? 'x' : 'y'}.png`}
              alt="Oxen's Roadmap and Plans for the future."
              width={horizontal ? '1920' : '700'}
              height={horizontal ? '1009' : '1615'}
              layout="responsive"
              quality={100}
              priority={true}
            />
          </div>
        </div>
      </div>

      <div ref={ref} className="w-full h-full">
        <div className="flex flex-col px-6 pb-6 space-y-10">
          <div>
            <h2 className="mt-6 mb-3 text-3xl font-medium text-center tablet:text-4xl font-prompt text-primary">
              Session in 2021
            </h2>
            <div
              className="relative w-full"
              style={{ height: horizontal ? '90%' : 'auto' }}
            >
              <Image
                src={`/img/session-${horizontal ? 'x' : 'y'}.png`}
                alt="Session's Roadmap and Plans for the future."
                width={horizontal ? '17138' : '4688'}
                height={horizontal ? '9992' : '12009'}
                layout="responsive"
                quality={100}
                priority={true}
                loading="eager"
                className="rounded-md"
              />
            </div>
          </div>

          <div>
            <h2 className="mt-6 mb-3 text-3xl font-medium text-center tablet:text-4xl font-prompt text-primary">
              Lokinet in 2021
            </h2>
            <div className="relative w-full" style={{ height: '90%' }}>
              <Image
                src={`/img/lokinet-${horizontal ? 'x' : 'y'}.png`}
                alt="Lokinet's Roadmap and Plans for the future."
                width={horizontal ? '8003' : '4688'}
                height={horizontal ? '3808' : '10150'}
                layout="responsive"
                quality={100}
                priority={true}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Roadmap;
