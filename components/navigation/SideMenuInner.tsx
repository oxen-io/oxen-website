import classNames from 'classnames';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import FacebookSVG from '../../assets/svgs/socials/facebook.svg';
import InstargamSVG from '../../assets/svgs/socials/instagram.svg';
import TwitterSVG from '../../assets/svgs/socials/twitter.svg';
import { NAVIGATION } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { setSideMenuActive, SideMenuItem } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { Contained } from '../Contained';
import { SideMenuRow } from './SideMenuRow';

export function SideMenuInner() {
  const { isHuge, isDesktop } = useContext(ScreenContext);
  const { sideMenuActive: active } = useSelector(
    (state: IState) => state.navigation,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex flex-col flex-grow h-full duration-300 mobile:children:last:border-b-0">
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

      {!isHuge && (
        <Contained>
          <div className="flex flex-col w-full space-y-4">
            <div
              className={classNames(
                'flex justify-between pt-8 pb-2 font-medium uppercase font-prompt',
                isDesktop ? 'text-xs' : 'text-sm',
              )}
            >
              {_.chunk(NAVIGATION.MENU_ITEMS, 3).map(group => (
                <div key={uuid()} className="flex flex-col space-y-2">
                  {group.map(item => (
                    <a key={item.label} href={item.href}>
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <FacebookSVG className="h-10" />
              <TwitterSVG className="h-10" />
              <InstargamSVG className="h-10" />
            </div>
          </div>
        </Contained>
      )}
    </div>
  );
}
