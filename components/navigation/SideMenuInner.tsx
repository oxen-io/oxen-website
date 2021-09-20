/* eslint-disable react/jsx-no-target-blank */
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import _ from 'lodash';

import { NAVIGATION } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { IState } from '../../state/reducers';

import { Contained } from '../Contained';
import { SideMenuRow } from './SideMenuRow';

import CoinMarketCapImage from '../../public/img/coinmarketcap.png';
import CoinGeckoImage from '../../public/img/coingecko.png';

import { ReactComponent as GithubSVG } from '../../assets/svgs/socials/github.svg';
import { ReactComponent as RedditSVG } from '../../assets/svgs/socials/reddit.svg';
import { ReactComponent as RssSVG } from '../../assets/svgs/socials/rss.svg';
import { ReactComponent as SessionSVG } from '../../assets/svgs/socials/session.svg';
import { ReactComponent as TelegramSVG } from '../../assets/svgs/socials/telegram.svg';
import { ReactComponent as TwitterSVG } from '../../assets/svgs/socials/twitter.svg';
import { ReactComponent as YouTubeSVG } from '../../assets/svgs/socials/youtube.svg';

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
      <div className="flex flex-col flex-grow h-full duration-300">
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
                'flex flex-col pt-8 pl-6 font-medium uppercase font-prompt text-lg',
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
        <div className="px-3 pb-3">
          <SocialsRow />

          <div className="flex items-center justify-between px-3 font-medium whitespace-nowrap">
            <Link href="/downloads/oxen-media-kit.zip">
              <a
                target="_blank"
                className="flex items-center space-x-1 hover:underline hover:text-secondary"
              >
                <span>Media Kit</span>
              </a>
            </Link>
            <a
              href="https://coinmarketcap.com/currencies/oxen/"
              target="_blank"
              rel="nofollow"
              className="flex items-center space-x-1 hover:underline hover:text-secondary"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={CoinMarketCapImage}
                  alt="CMC logo"
                  layout="fill"
                  placeholder="blur"
                />
              </div>
              <span>CMC</span>
            </a>
            <a
              href="https://www.coingecko.com/en/coins/oxen"
              target="_blank"
              rel="nofollow"
              className="flex items-center space-x-1 hover:underline hover:text-secondary"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={CoinGeckoImage}
                  alt="CoinGecko logo"
                  layout="fill"
                  placeholder="blur"
                />
              </div>
              <span>CoinGecko</span>
            </a>
          </div>
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
  const { isTablet } = useContext(ScreenContext);

  return (
    <div
      className={classNames(
        'flex pt-4 pb-4',
        isTablet ? 'justify-start space-x-5 px-6' : 'justify-between',
      )}
    >
      <a href="https://t.me/Oxen_Community" target="_blank" rel="noreferrer">
        <TelegramSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a href="https://twitter.com/Oxen_io" target="_blank" rel="noreferrer">
        <TwitterSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a href="https://github.com/oxen-io" target="_blank" rel="noreferrer">
        <GithubSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
      </a>
      {/* <a
        href="https://discord.com/invite/67GXfD6"
        target="_blank"
        rel="noreferrer"
      >
        <DiscordSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
      </a> */}
      <a
        href="https://www.youtube.com/channel/UCN7LL0dEffQ7FSjbY5wwlnw"
        target="_blank"
        rel="noreferrer"
      >
        <YouTubeSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a
        href="https://www.reddit.com/r/oxen_io/"
        target="_blank"
        rel="noreferrer"
      >
        <RedditSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <a href="https://sessiongroups.com/" target="_blank" rel="noreferrer">
        <SessionSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
      </a>
      <Link href="/feed">
        <a target="_self" rel="noreferrer">
          <RssSVG className="h-10 placeholder-current duration-300 border rounded-full cursor-pointer fill-current stroke-current hover:bg-primary hover:text-secondary border-primary" />
        </a>
      </Link>
    </div>
  );
};
