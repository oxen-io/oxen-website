import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { collapseSideMenu, expandSideMenu } from '../../state/navigation';
import { IState } from '../../state/reducers';

export function SideMenuActiveIndicator() {
  const { sideMenuExpanded: expanded, sideMenuActive: active } = useSelector(
    (state: IState) => state.navigation,
  );
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);
  const isCollapsible = isTablet || isMobile;
  const dispatch = useDispatch();

  return (
    <div
      className={classNames(
        'flex flex-col justify-between items-center h-full bg-blue-300 px-4 py-6 border-l border-r border-b border-black',
        isHuge ? 'w-20 text-3xl' : 'w-12 text-2xl',
      )}
    >
      <div>
        {isCollapsible && (
          <>
            {expanded ? (
              <LeftOutlined onClick={() => dispatch(expandSideMenu())} />
            ) : (
              <RightOutlined onClick={() => dispatch(collapseSideMenu())} />
            )}
          </>
        )}
      </div>

      <div
        className={classNames(
          'flex items-center justify-start w-0 h-0 duration-300 transform -rotate-90',
        )}
      >
        <span className="whitespace-no-wrap">
          {NAVIGATION.SIDE_MENU_ITEMS[active].label}
        </span>
      </div>
    </div>
  );
}
