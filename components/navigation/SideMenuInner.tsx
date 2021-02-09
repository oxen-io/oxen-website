import classNames from 'classnames';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import GithubSVG from '../../assets/svgs/socials/github.svg';
import TelegramSVG from '../../assets/svgs/socials/telegram.svg';
import TwitterSVG from '../../assets/svgs/socials/twitter.svg';
import { NAVIGATION } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { Contained } from '../Contained';
import { SideMenuRow } from './SideMenuRow';

export function SideMenuInner() {
  const { isHuge, isDesktop } = useContext(ScreenContext);

  const dispatch = useDispatch();
  const router = useRouter();

  const itemIsActive = (href: string) => {
    return href === '/'
      ? // Location is at home
        router.asPath === '/'
      : // All other pages
        new RegExp(`^${href}`).test(router.pathname);
  };

  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex flex-col flex-grow h-full duration-300 mobile:children:last:border-b-0">
        {Object.entries(NAVIGATION.SIDE_MENU_ITEMS).map(([key, item]) => (
          <SideMenuRow
            item={item}
            key={item.label}
            isActive={itemIsActive(item.href)}
          />
        ))}
      </div>

      <Contained>
        <div className="flex flex-col w-full space-y-4">
          {!isDesktop && (
            <div
              className={classNames(
                'flex flex-col pt-8 pb-2 font-medium uppercase font-prompt',
                isDesktop ? 'text-xs' : 'text-base',
              )}
            >
              {_.chunk(NAVIGATION.MENU_ITEMS, 3).map(group => (
                <div key={uuid()} className="flex justify-between space-x-2 ">
                  {group.map(item => (
                    <a key={item.label} href={item.href}>
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="flex pb-6 -mx-6 space-x-3">
            <a
              href="https://t.me/Oxen_Community"
              target="_blank"
              rel="noreferrer"
            >
              <TelegramSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
            </a>
            <a
              href="https://twitter.com/Oxen_io"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
            </a>
            <a
              href="https://github.com/oxen-io"
              target="_blank"
              rel="noreferrer"
            >
              <GithubSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
            </a>
          </div>
        </div>
      </Contained>
    </div>
  );
}
