import classNames from 'classnames';
import React, { useContext } from 'react';
import TriangleOutlinedSVG from '../../assets/svgs/triangle-outlined.svg';
import TriangleSVG from '../../assets/svgs/triangle.svg';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { ISideMenuItem } from './SideMenu';

interface SideMenuRowProps {
  item: ISideMenuItem;
  isActive: boolean;
  onClick: () => void;
}

export function SideMenuRow({ item, isActive, onClick }: SideMenuRowProps) {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);
  const isCollapsible = isTablet || isMobile;

  return (
    <div
      onClick={onClick}
      style={{
        maxHeight: '5rem',
        padding:
          isMobile || isTablet
            ? `0 ${UI.PAGE_CONTAINED_PADDING_VW}vw`
            : 'unset',
      }}
      className={classNames(
        'flex flex-1 space-x-6 justify-between text-primary items-center cursor-pointer border-b border-black py-4 hover:bg-secondary duration-300',
        isHuge ? 'text-3xl' : isDesktop ? 'text-xl' : 'text-xl',
        isActive ? 'bg-secondary' : 'bg-transparent',
      )}
    >
      <span className="pl-6 whitespace-no-wrap">{item.label}</span>

      {!isMobile && !isTablet && (
        <>
          {!isCollapsible && isActive ? (
            <TriangleSVG className="h-4 pr-6" />
          ) : (
            <TriangleOutlinedSVG className="h-4 pr-6" />
          )}
        </>
      )}
    </div>
  );
}
