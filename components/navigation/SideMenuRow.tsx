import classNames from 'classnames';
import React, { useContext } from 'react';
import TriangleOutlinedSVG from '../../assets/svgs/triangle-outlined.svg';
import TriangleSVG from '../../assets/svgs/triangle.svg';
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
      className={classNames(
        'flex flex-1 space-x-6 justify-between items-center cursor-pointer border-b border-black px-4 py-4 hover:bg-secondary duration-300',
        isHuge ? 'text-3xl' : isDesktop ? 'text-xl' : '',
        isActive ? 'bg-secondary' : 'bg-transparent',
      )}
    >
      <span className="whitespace-no-wrap">{item.label}</span>
      {!isCollapsible && isActive ? (
        <TriangleSVG className="h-4" />
      ) : (
        <TriangleOutlinedSVG className="h-4" />
      )}
    </div>
  );
}
