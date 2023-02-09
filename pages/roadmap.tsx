import { METADATA, NAVIGATION } from '@/constants';
import CustomHead from '@/components/CustomHead';
import { SideMenuItem } from '@/state/navigation';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Image from 'next/image';
import React from 'react';
import { useScreenSize } from '@/hooks/screen';

function Roadmap() {
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  const renderTransformComp = () => {
    return (
      <TransformComponent wrapperStyle={{ height: '100vh' }}>
        <Image
          src={'/svgs/roadmap.svg'}
          alt="roadmap"
          height={6478}
          width={11519}
        />
      </TransformComponent>
    );
  };

  return (
    <>
      <CustomHead
        title={NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.ROADMAP].label}
        metadata={METADATA.ROADMAP_PAGE}
      />
      {isDesktop && (
        <TransformWrapper
          /* className="relative w-full" */
          initialScale={2.5}
          initialPositionX={-1000}
          initialPositionY={-200}
        >
          {renderTransformComp()}
        </TransformWrapper>
      )}
      {isTablet && (
        <TransformWrapper initialScale={2.5} initialPositionX={-550}>
          {renderTransformComp()}
        </TransformWrapper>
      )}
      {isMobile && (
        <TransformWrapper
          initialScale={4.5}
          initialPositionX={-650}
          initialPositionY={null}
        >
          {renderTransformComp()}
        </TransformWrapper>
      )}

      {/*       <div className="absolute right-5 bottom-8">
          <Image
            src={'/svgs/roadmap-key.svg'}
            alt="roadmap"
            height={200}
            width={125}
          />
        </div> */}
    </>
  );
}

export default Roadmap;
