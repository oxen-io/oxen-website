import { METADATA, NAVIGATION, UI } from '@/constants';
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ReactComponent as CrossSVG } from '@/assets/svgs/cross.svg';
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
  showExplanation: boolean;
  setShowExplanation: any;
  isMobileDisplay: boolean;
};

const RoadmapCanvas = (props: RoadmapCanvasProps): ReactElement => {
  const {
    loaded,
    canScaleMore,
    showExplanation,
    setShowExplanation,
    isMobileDisplay,
  } = props;

  return (
    <div
      className={classNames(
        'relative',
        loaded ? 'visibility' : 'invisible',
        isMobileDisplay && 'bg-tertiary',
      )}
      style={{
        height: loaded ? `calc(100vh - ${UI.HEADER_HEIGHT_PX}px)` : '0vh',
      }}
    >
      {!isMobileDisplay && (
        <canvas
          id={'#roadmap-image'}
          aria-label={"Oxen's roadmap for the future shown as a progress tree"}
          className={classNames('cursor-move z-0')}
          // upscaled for better text rendering
          // mobile and tablets have smaller upscale limit
          width={3686 * (canScaleMore ? 1.75 : 1.45)}
          height={2073 * (canScaleMore ? 1.75 : 1.45)}
        />
      )}
      {loaded && showExplanation && (
        <div
          className={classNames(
            'relative flex justify-center items-center',
            'tablet:absolute tablet:block tablet:left-6 tablet:bottom-6',
          )}
          style={{
            height: isMobileDisplay ? '100%' : 304.8,
            width: isMobileDisplay ? '100%' : 313.6,
          }}
          onClick={() => {
            if (isMobileDisplay) {
              setShowExplanation(false);
            }
          }}
        >
          <CrossSVG
            className={classNames(
              'cursor-pointer absolute z-10 inline w-4 h-4 text-white fill-current top-6 right-6',
              'tablet:top-10 tablet:right-10 ',
            )}
            onClick={() => {
              setShowExplanation(false);
            }}
          />
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={'/svgs/roadmap-explanation.svg'}
            alt="Oxen Roadmap Explanation"
            height={isMobileDisplay ? '100%' : 762 / 2.5}
            width={isMobileDisplay ? '100%' : 784 / 2.5}
          />
        </div>
      )}
    </div>
  );
};

export default function Roadmap() {
  const { isMobile, isTablet, isHuge, isEnormous } = useContext(ScreenContext);
  const [loaded, setLoaded] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  const startup = useCallback(() => {
    if (isMobile && showExplanation) {
      console.log('mobile popup loaded');
      setLoaded(true);
      return;
    }

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
  }, [isMobile, showExplanation]);

  useEffect(() => {
    startup();

    if (loaded && !(isMobile && showExplanation)) {
      const roadmapEl = document.getElementById('#roadmap-image');
      pz = panzoom(roadmapEl, {
        initialZoom: isMobile
          ? 0.3
          : isTablet
          ? 0.4
          : isHuge
          ? 0.3333
          : isEnormous
          ? 0.6
          : 0.25,
        minZoom: isMobile
          ? 0.07
          : isTablet
          ? 0.125
          : isHuge
          ? 0.12
          : isEnormous
          ? 0.2
          : 0.1,
        autocenter: false,
        initialX: isMobile
          ? -900
          : isTablet
          ? -1200
          : isHuge
          ? -800
          : isEnormous
          ? -2200
          : -600,
        initialY: isMobile
          ? -100
          : isTablet
          ? -200
          : isHuge
          ? -100
          : isEnormous
          ? -300
          : -100,
        bounds: true,
        boundsPadding: isMobile ? 0 : isTablet ? 0 : -0.1,
      });
    }

    () => {
      if (loaded && pz) {
        pz.dispose();
      }
    };
  }, [
    isMobile,
    isTablet,
    isHuge,
    isEnormous,
    loaded,
    startup,
    showExplanation,
  ]);

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
      <RoadmapCanvas
        loaded={loaded}
        canScaleMore={!isMobile && !isTablet}
        showExplanation={showExplanation}
        setShowExplanation={setShowExplanation}
        isMobileDisplay={isMobile && showExplanation}
      />
      {!(isMobile && showExplanation) && loaded && (
        <>
          <div className={classNames('z-10 absolute right-6 bottom-6')}>
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src={'/svgs/roadmap-key.svg'}
              alt="Oxen Roadmap Legend"
              height={isMobile ? 180 : 242}
              width={isMobile ? 150 : 200}
            />
          </div>
        </>
      )}
    </>
  );
}
