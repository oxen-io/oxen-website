import classNames from 'classnames';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClickAway } from 'react-use';
import { UI } from '../../constants';
import { collapseSideMenu, PageType } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { SideMenuInner } from './SideMenuInner';
import { SideBarMode, SideMenuSideBar } from './SideMenuSideBar';

export function SideMenuSplit() {
  const { pageType, sideMenuExpanded } = useSelector(
    (state: IState) => state.navigation,
  );

  const ref = useRef(null);
  const dispatch = useDispatch();

  const onClickAway = () => {
    if (sideMenuExpanded && pageType === PageType.NORMAL) {
      dispatch(collapseSideMenu());
    }
  };

  useClickAway(ref, onClickAway);

  const transform =
    pageType === PageType.NORMAL || sideMenuExpanded
      ? 'translateX(0)'
      : `translateX(-100%) translateX(${UI.SIDE_MENU_SIDE_BAR_WIDTH_PX - 3}px)`;

  return (
    <div
      ref={ref}
      style={{
        // minWidth: pageType === PageType.NORMAL ? '50vw' : '0',
        zIndex: 20033,
        height:
          pageType === PageType.NORMAL
            ? 'unset'
            : `calc(100vh - ${UI.HEADER_HEIGHT_PX}px`,
        transform,
      }}
      className={classNames(
        'relative flex text-primary bg-alWt duration-300 mt-px z-50',
      )}
    >
      {pageType === PageType.NORMAL && (
        <div
          style={{
            height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px`,
          }}
          className="w-full overflow-y-auto"
        >
          <SideMenuInner />
        </div>
      )}

      <SideMenuSideBar mode={SideBarMode.LABEL} />
    </div>
  );
}
