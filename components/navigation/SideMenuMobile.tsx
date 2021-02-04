import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import FacebookSVG from '../../assets/svgs/socials/facebook.svg';
import InstargamSVG from '../../assets/svgs/socials/instagram.svg';
import TwitterSVG from '../../assets/svgs/socials/twitter.svg';
import { NAVIGATION, UI } from '../../constants';
import { IState } from '../../state/reducers';
import { Contained } from '../Contained';
import { SideMenuInner } from './SideMenuInner';

export function SideMenuMobile() {
  const { sideMenuExpanded: expanded } = useSelector(
    (state: IState) => state.navigation,
  );

  console.log(
    'SideMenuMobile ➡️ NAVIGATION.MENU_ITEMS:',
    NAVIGATION.MENU_ITEMS,
  );

  return (
    <div
      style={{
        height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px`,
        top: `${UI.HEADER_HEIGHT_PX}px`,
        zIndex: 30000,
      }}
      className={classNames(
        'fixed inset-0 flex duration-300 transform border-t bg-alt border-primary',
        expanded ? '-translate-x-full' : 'translate-x-0',
      )}
    >
      <div className="flex flex-col w-full space-y-4">
        <div className="flex flex-col flex-grow">
          <SideMenuInner />
        </div>

        <Contained>
          <div className="flex flex-col w-full space-y-4">
            <div className="flex justify-between pt-8 pb-2 text-sm font-medium uppercase font-prompt">
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
      </div>
    </div>
  );
}
