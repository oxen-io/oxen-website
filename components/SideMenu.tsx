import React, { useState } from 'react';
import { IMenuItem } from '../constants/navigation';
import { Button } from './Button';

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

interface IMenuItem {
  label: string;
}

// TODO - Put sideMenuItems in Contentful and fetch them server side.
const sideMenuItems = {
  [SideMenuItem.WHO_ARE_WE]: {
    label: 'Who are we',
  },
  [SideMenuItem.MISSION]: {
    label: 'Our mission',
  },
  [SideMenuItem.BUY_OXEN]: {
    label: 'Why buy Oxen?',
  },
  [SideMenuItem.TOOLS]: {
    label: 'What are our tools?',
  },
  [SideMenuItem.BUILD]: {
    label: 'How can I build?',
  },
  [SideMenuItem.SUPPORT]: {
    label: 'I need support',
  },
  [SideMenuItem.LEARN_MORE]: {
    label: 'How can I find more?',
  },
  [SideMenuItem.BLOG]: {
    label: 'Our blog',
  },
} as { [name: string]: IMenuItem };

export function SideMenu() {
  const [active, setActive] = useState<IMenuItem>(
    sideMenuItems[SideMenuItem.WHO_ARE_WE],
  );

  return (
    <div className="flex h-full bg-red-300">
      <div className="flex flex-col h-full flex-grow">
        {Object.values(sideMenuItems).map(item => (
          <SideMenuRow
            item={item}
            key={item.label}
            onClick={() => setActive(item)}
          />
        ))}
      </div>

      <SideMenuActiveIndicator active={active} />
    </div>
  );
}

interface SideMenuRowProps {
  item: IMenuItem;
  onClick: () => void;
}

function SideMenuRow({ item, onClick }: SideMenuRowProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-1 justify-between items-center cursor-pointer border-t border-black px-4"
    >
      <span className="text-4xl">{item.label}</span>
      <Button type="text" size="large" className="text-5xl">
        {'>'}
      </Button>
    </div>
  );
}

function SideMenuActiveIndicator({ active }: { active: IMenuItem }) {
  return (
    <div className="flex justify-center items-end w-20 h-full bg-blue-300 px-4 py-6 border border-black">
      <div className="flex justify-start items-center h-0 w-0 transform -rotate-90">
        <span className="text-4xl whitespace-no-wrap">{active.label}</span>
      </div>
    </div>
  );
}
