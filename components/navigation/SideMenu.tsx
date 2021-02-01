import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { collapseSideMenu, expandSideMenu } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { Button } from '../Button';

enum SideMenuItem {
  WHO_ARE_WE = 'WHO_ARE_WE',
  MISSION = 'MISSION',
  BUY_OXEN = 'BUY_OXEN',
  TOOLS = 'TOOLS',
  BUILD = 'BUILD',
  SUPPORT = 'SUPPORT',
  LEARN_MORE = 'LEARN_MORE',
  BLOG = 'BLOG',
}

interface ISideMenuItem {
  id: number;
  label: string;
}

// TODO - Put sideMenuItems in Contentful and fetch them server side.
const sideMenuItems = {
  [SideMenuItem.WHO_ARE_WE]: {
    id: 1,
    label: 'Who are we',
  },
  [SideMenuItem.MISSION]: {
    id: 2,
    label: 'Our mission',
  },
  [SideMenuItem.BUY_OXEN]: {
    id: 3,
    label: 'Why buy Oxen?',
  },
  [SideMenuItem.TOOLS]: {
    id: 4,
    label: 'What are our tools?',
  },
  [SideMenuItem.BUILD]: {
    id: 5,
    label: 'How can I build?',
  },
  [SideMenuItem.SUPPORT]: {
    id: 6,
    label: 'I need support',
  },
  [SideMenuItem.LEARN_MORE]: {
    id: 7,
    label: 'How can I find more?',
  },
  [SideMenuItem.BLOG]: {
    id: 8,
    label: 'Our blog',
  },
} as { [name: string]: ISideMenuItem };

export function SideMenu() {
  const { sideMenuExpanded } = useSelector((state: IState) => state.navigation);
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);

  const isCollapsible = isTablet || isMobile;
  const [active, setActive] = useState<ISideMenuItem>(
    sideMenuItems[SideMenuItem.WHO_ARE_WE],
  );

  return (
    <div className="flex text-primary">
      <div
        style={{
          height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px`,
          minWidth: isCollapsible && sideMenuExpanded ? '250px' : 'unset',
          width: isCollapsible && sideMenuExpanded ? 'unset' : '0px',
        }}
        className="overflow-y-auto children:last:border-b-0 duration-300"
      >
        {Object.values(sideMenuItems).map(item => (
          <SideMenuRow
            item={item}
            key={item.label}
            isActive={item.id === active.id}
            onClick={() => setActive(item)}
          />
        ))}
      </div>

      <SideMenuActiveIndicator active={active} />
    </div>
  );
}

interface SideMenuRowProps {
  item: ISideMenuItem;
  isActive: boolean;
  onClick: () => void;
}

function SideMenuRow({ item, isActive, onClick }: SideMenuRowProps) {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);

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
      {isActive ? <CloseOutlined /> : <RightOutlined />}
    </div>
  );
}

function SideMenuActiveIndicator({ active }: { active: ISideMenuItem }) {
  const { sideMenuExpanded } = useSelector((state: IState) => state.navigation);
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
            {sideMenuExpanded ? (
              <Button onClick={() => dispatch(collapseSideMenu())}>
                {'<'}
              </Button>
            ) : (
              <Button onClick={() => dispatch(expandSideMenu())}>{'>'}</Button>
            )}
          </>
        )}
      </div>

      <div className="flex justify-start items-center h-0 w-0 transform -rotate-90">
        <span className="whitespace-no-wrap">{active.label}</span>
      </div>
    </div>
  );
}
