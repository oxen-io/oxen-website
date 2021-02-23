import classNames from 'classnames';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import DiscordSVG from '../../assets/svgs/socials/discord.svg';
import GithubSVG from '../../assets/svgs/socials/github.svg';
import RedditSVG from '../../assets/svgs/socials/reddit.svg';
import TelegramSVG from '../../assets/svgs/socials/telegram.svg';
import TwitterSVG from '../../assets/svgs/socials/twitter.svg';
import YouTubeSVG from '../../assets/svgs/socials/youtube.svg';
import { NAVIGATION } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { IState } from '../../state/reducers';
import { Contained } from '../Contained';
import { SideMenuRow } from './SideMenuRow';

export function SideMenuInner() {
  const { isHuge, isDesktop } = useContext(ScreenContext);
  const { pages } = useSelector((state: IState) => state.navigation);
  const dispatch = useDispatch();
  const router = useRouter();

  const itemIsActive = (href: string) => {
    return href === '/'
      ? // Location is at home
        router.asPath === '/'
      : // All other pages
        new RegExp(`^${href}`).test(router.asPath);
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
        {/* {Object.entries(pages ?? {}).map(([key, item]) => (
          <SideMenuRow
            item={{
              id: 1,
              href: slugify(item.id),
              label: item.label,
            }}
            key={item.label}
            isActive={itemIsActive(slugify(item.id))}
          />
        ))} */}
      </div>

      <Contained>
        <div className="flex flex-col w-full mb-4 space-y-6">
          {!isDesktop && (
            <div
              className={classNames(
                'flex flex-col pt-8 font-medium uppercase font-prompt text-lg',
              )}
            >
              {_.chunk(NAVIGATION.MENU_ITEMS, 2).map(group => (
                <div key={uuid()} className="flex space-x-4">
                  {group.map(item => (
                    <div key={item.label} className="flex-1">
                      <a href={item.href}>{item.label}</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </Contained>

      {isDesktop ? (
        <div className="px-6 pb-3">
          <SocialsRow />

          <a
            href="https://www.coingecko.com/en/coins/oxen"
            className="font-medium text-secondary"
          >
            View Oxen on <span className="font-bold">CoinGecko</span>
          </a>
        </div>
      ) : (
        <Contained>
          <SocialsRow />
        </Contained>
      )}
    </div>
  );
}

const SocialsRow = () => {
  const { isDesktop } = useContext(ScreenContext);

  return (
    <div
      className={classNames(
        'flex pt-3 pb-3 space-x-3 justify-between',
        isDesktop && 'justify-between',
      )}
    >
      <a href="https://t.me/Oxen_Community" target="_blank" rel="noreferrer">
        <TelegramSVG className="h-12 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current tablet:h-10 hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a href="https://twitter.com/Oxen_io" target="_blank" rel="noreferrer">
        <TwitterSVG className="h-12 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current tablet:h-10 hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a href="https://github.com/oxen-io" target="_blank" rel="noreferrer">
        <GithubSVG className="h-12 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current tablet:h-10 hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a
        href="https://discord.com/invite/67GXfD6"
        target="_blank"
        rel="noreferrer"
      >
        <DiscordSVG className="h-12 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current tablet:h-10 hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a
        href="https://www.youtube.com/channel/UCN7LL0dEffQ7FSjbY5wwlnw"
        target="_blank"
        rel="noreferrer"
      >
        <YouTubeSVG className="h-12 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current tablet:h-10 hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a
        href="https://www.reddit.com/r/oxen_io/"
        target="_blank"
        rel="noreferrer"
      >
        <RedditSVG className="h-12 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current tablet:h-10 hover:bg-primary hover:text-secondary border-primary" />
      </a>
    </div>
  );
};
