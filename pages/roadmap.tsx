import Head from 'next/head';
import React from 'react';
import { useMeasure } from 'react-use';
import { NAVIGATION } from '../constants';
import { SideMenuItem } from '../state/navigation';
import { generateTitle } from '../utils/metadata';

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
      <Head>
        <title>
          {generateTitle(
            NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.ROADMAP].label,
          )}
        </title>
      </Head>

      <div className="mx-4">
        <div className="flex items-center justify-center mt-8">
          <img
            style={{ maxHeight: '90%' }}
            src={`img/roadmap-${horizontal ? 'x' : 'y'}.png`}
            className="w-full"
          />
        </div>
      </div>

      <div ref={ref} className="w-full h-full">
        <div className="flex flex-col px-6 pb-6 space-y-10">
          <div>
            <h2 className="mt-6 mb-3 text-3xl font-medium text-center tablet:text-4xl font-prompt text-primary">
              Session in 2021
            </h2>
            <img
              style={{ maxHeight: horizontal ? '90%' : 'auto' }}
              src={`img/session-${horizontal ? 'x' : 'y'}.jpg`}
              className="w-full rounded-md"
            />
          </div>

          <div>
            <h2 className="mt-6 mb-3 text-3xl font-medium text-center tablet:text-4xl font-prompt text-primary">
              Lokinet in 2021
            </h2>
            <img
              style={{ maxHeight: '90%' }}
              src={`img/lokinet-${horizontal ? 'x' : 'y'}.jpg`}
              className="w-full rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Roadmap;
