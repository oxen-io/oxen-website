import classNames from 'classnames';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import TriangleOutlinedSVG from '../../assets/svgs/triangle-outlined.svg';
import TriangleSVG from '../../assets/svgs/triangle.svg';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { collapseSideMenu } from '../../state/navigation';
import { ISideMenuItem } from './SideMenu';

interface SideMenuRowProps {
  item: ISideMenuItem;
  isActive: boolean;
}

export function SideMenuRow({ item, isActive }: SideMenuRowProps) {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);
  const isCollapsible = isTablet || isMobile;
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(collapseSideMenu());
  };

  return (
    <Link href={item.href}>
      <div
        onClick={handleOnClick}
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
    </Link>
  );
}
