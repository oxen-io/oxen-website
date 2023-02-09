import { METADATA, NAVIGATION, UI } from '@/constants';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

import CustomHead from '@/components/CustomHead';
import { ReactComponent as LoadingSVG } from '@/assets/svgs/loader.svg';
import { ScreenContext } from '@/contexts/screen';
import { SideMenuItem } from '@/state/navigation';
import classNames from 'classnames';
import panzoom from 'panzoom';

let pz = null; // global panzoom instance

type RoadmapCanvasProps = {
  loaded: boolean;
  canScaleMore: boolean;
};

const RoadmapCanvas = (props: RoadmapCanvasProps): ReactElement => {
  const { loaded, canScaleMore } = props;

  return (
    <div
      className={classNames(loaded ? 'visibility' : 'invisible')}
      style={{
        height: loaded ? `calc(100vh - ${UI.HEADER_HEIGHT_PX}px)` : '0vh',
      }}
    >
      <canvas
        id={'#roadmap-image'}
        className={classNames('cursor-move')}
        // upscaled for better text rendering
        // mobile and tablets have smaller upscale limit
        width={3686 * (canScaleMore ? 1.75 : 1.45)}
        height={2073 * (canScaleMore ? 1.75 : 1.45)}
      />
    </div>
  );
};

export default function Roadmap() {
  const { isMobile, isTablet } = useContext(ScreenContext);
  const [loaded, setLoaded] = useState(false);

  const startup = () => {
    const canvasHolder = document.getElementById(
      '#roadmap-image',
    ) as HTMLCanvasElement;
    const context = canvasHolder.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.src = '/svgs/roadmap.svg';

    backgroundImage.onload = function () {
      context.drawImage(
        backgroundImage,
        0,
        0,
        canvasHolder.width,
        canvasHolder.height,
      );
      context.save();

      console.log('roadmap loaded');
      setLoaded(true);
    };
  };

  useEffect(() => {
    startup();

    if (loaded) {
      const roadmapEl = document.getElementById('#roadmap-image');
      pz = panzoom(roadmapEl, {
        initialZoom: isMobile ? 0.3 : isTablet ? 0.4 : 0.3333,
        autocenter: isMobile ? false : isTablet ? false : false,
        initialX: isMobile ? -900 : isTablet ? -1200 : -800,
        initialY: isMobile ? -100 : isTablet ? -200 : -100,
        bounds: true,
        boundsPadding: isMobile ? 0 : isTablet ? 0 : -0.1,
      });
    }

    () => {
      if (loaded && pz) {
        pz.dispose();
      }
    };
  }, [isMobile, isTablet, loaded]);

  return (
    <>
      <CustomHead
        title={NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.ROADMAP].label}
        metadata={METADATA.ROADMAP_PAGE}
      />
      {!loaded && (
        <div
          className={classNames('flex justify-center items-center w-100')}
          title="loading"
          style={{
            height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px)`,
          }}
        >
          <LoadingSVG
            className={classNames(
              'w-48 h-48 mx-auto text-primary fill-current -mt-8',
              'tablet:-mt-32',
            )}
          />
        </div>
      )}
      <RoadmapCanvas loaded={loaded} canScaleMore={!isMobile && !isTablet} />
      <div className="absolute right-5 bottom-8">
        <img
          src={'/svgs/roadmap-key.svg'}
          alt="Oxen Roadmap Legend"
          height={isMobile ? 180 : 242}
          width={isMobile ? 150 : 200}
        />
      </div>
    </>
  );
}
