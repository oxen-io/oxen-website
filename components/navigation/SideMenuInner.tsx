import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION } from '../../constants';
import { setSideMenuActive, SideMenuItem } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { SideMenuRow } from './SideMenuRowProps';

export function SideMenuInner() {
  const { sideMenuActive: active } = useSelector(
    (state: IState) => state.navigation,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="h-full overflow-y-auto duration-300 children:last:border-b-0">
      {Object.entries(NAVIGATION.SIDE_MENU_ITEMS).map(([key, item]) => (
        <SideMenuRow
          item={item}
          key={item.label}
          isActive={key === active}
          onClick={() => {
            if (item.href) {
              router.push(item.href);
              return;
            }

            dispatch(setSideMenuActive(SideMenuItem[key]));
          }}
        />
      ))}
    </div>
  );
}
