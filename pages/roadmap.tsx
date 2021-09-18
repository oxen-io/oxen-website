import Head from 'next/head';
import React from 'react';
import { useMeasure } from 'react-use';
import { NAVIGATION, METADATA } from '../constants';
import { SideMenuItem } from '../state/navigation';
import { generateTitle, generateURL } from '../utils/metadata';

function Roadmap() {
  const [ref, { width, height }] = useMeasure();
  const aspectRatio = width / height;

  // Control the aspect ratio of the page images
  const horizontal = width > 600 && aspectRatio > 0.65;

  console.log('roadmap ➡️ horizontal:', horizontal);

  console.log('roadmap ➡️ height:', height);
  console.log('roadmap ➡️ width:', width);
  console.log('roadmap ➡️ ratio:', aspectRatio);

  const pageTitle = generateTitle(
    NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.ROADMAP].label,
  );
  const pageURL = generateURL(
    NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.ROADMAP].href,
  );
  const imageURL = `${METADATA.HOST_URL}/site-banner.png`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={METADATA.ROADMAP_PAGE.DESCRIPTION}
        ></meta>
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={METADATA.ROADMAP_PAGE.DESCRIPTION}
          key="ogdesc"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageURL} />
        <meta property="og:image" content={imageURL} key="ogimage" />
        <link rel="canonical" href={pageURL}></link>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={METADATA.ROADMAP_PAGE.DESCRIPTION}
        />
        <meta name="twitter:image" content={imageURL} />
      </Head>

      <div className="mx-4">
        <div className="flex items-center justify-center mt-8">
          <img
            style={{ maxHeight: '90%' }}
            src={`img/roadmap-${horizontal ? 'x' : 'y'}.png`}
            alt="Oxen's Roadmap and Plans for the future."
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
              src={`img/session-${horizontal ? 'x' : 'y'}.png`}
              alt="Session's Roadmap and Plans for the future."
              className="w-full rounded-md"
            />
          </div>

          <div>
            <h2 className="mt-6 mb-3 text-3xl font-medium text-center tablet:text-4xl font-prompt text-primary">
              Lokinet in 2021
            </h2>
            <img
              style={{ maxHeight: '90%' }}
              src={`img/lokinet-${horizontal ? 'x' : 'y'}.png`}
              alt="Lokinet's Roadmap and Plans for the future."
              className="w-full rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Roadmap;
