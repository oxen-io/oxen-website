import classNames from 'classnames';
import Link from 'next/link';
import React, { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHoverDirty } from 'react-use';
import TriangleOutlinedSVG from '../../assets/svgs/triangle-outlined.svg';
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

  const ref = useRef(null);
  const isHovering = useHoverDirty(ref);
  const isExcited = !isCollapsible && (isActive || isHovering);

  const inner = (
    <div
      ref={ref}
      onClick={handleOnClick}
      style={{
        maxHeight: '5rem',
        padding:
          isMobile || isTablet
            ? `0 ${UI.PAGE_CONTAINED_PADDING_VW}vw`
            : 'unset',
      }}
      className={classNames(
        'flex flex-1 space-x-6 justify-between text-primary items-center cursor-pointer border-b border-black py-4 hover:bg-secondary duration-300 whitespace-nowrap',
        isHuge ? 'text-2xl' : isDesktop ? 'text-xl' : 'text-xl',
        isActive ? 'bg-secondary' : 'bg-transparent',
        item.shouldHide ? 'hidden' : '',
      )}
    >
      <span className="pl-6 whitespace-no-wrap">{item.label}</span>

      {!isMobile && !isTablet && (
        <TriangleOutlinedSVG
          className={classNames(
            'h-4 pr-6 duration-300 fill-current transform text-transparent',
            isExcited && 'text-primary scale-y-75',
          )}
        />
      )}
    </div>
  );

  return item.isExternal ? (
    <a href={item.href}>{inner}</a>
  ) : (
    <Link href={item.href}>{inner}</Link>
  );
}
