import { ISideMenuItem } from '../components/navigation/SideMenu';
import { SideMenuItem } from '../state/navigation';

export interface IMenuItem {
  label: string;
  href: string;
  newTab: boolean;
  subtle: boolean;
  external: boolean;
  mobileMenuOnly?: boolean;
}

// Hrefs are generated from Keys using slugify.
// Eg. WHO_ARE_WE -> /who-are-we
const SIDE_MENU_ITEMS = {
  [SideMenuItem.WHO_ARE_WE]: {
    id: 1,
    label: 'Who are we',
    href: '/who-are-we',
  },
  [SideMenuItem.BUILD]: {
    id: 2,
    label: 'How can I build?',
    href: '/build',
  },
  [SideMenuItem.BUY_OXEN]: {
    id: 3,
    label: 'Why buy Oxen?',
    href: '/buy-oxen',
  },
  [SideMenuItem.USES]: {
    id: 4,
    label: 'Uses',
    href: '/uses',
  },
  [SideMenuItem.STAKE]: {
    id: 7,
    label: 'Stake',
    href: '/stake',
  },
  [SideMenuItem.GET_INVOLVED]: {
    id: 8,
    label: 'Get involved',
    href: '/get-involved',
  },
  [SideMenuItem.SESSION_LOKINET]: {
    id: 7,
    label: 'Session - Lokinet',
    href: '/session-lokinet',
  },
} as { [name: string]: ISideMenuItem };

const MENU_ITEMS: IMenuItem[] = [
  {
    label: 'Blog',
    href: '/blog',
    newTab: false,
    subtle: false,
    external: false,
  },
  {
    label: 'Docs',
    href: 'https://docs.oxen.io',
    newTab: true,
    subtle: false,
    external: true,
  },
  {
    label: 'Get Involved',
    href: '/get-involved',
    newTab: false,
    subtle: false,
    external: false,
    mobileMenuOnly: true,
  },
  {
    label: 'Explorer',
    href: 'https://oxen.observer/',
    newTab: true,
    subtle: true,
    external: true,
  },
  {
    label: 'CoinGecko',
    href: 'https://www.coingecko.com/en/coins/oxen',
    newTab: true,
    subtle: true,
    external: true,
  },
  {
    label: 'Downloads',
    href: 'https://docs.oxen.io/downloads',
    newTab: true,
    subtle: true,
    external: true,
  },
];

const NAVIGATION = {
  MENU_ITEMS,
  SIDE_MENU_ITEMS,
  BLOG_REGEX: /^\/(blog)[?tag=[\w]*]?$/,
  POST_REGEX: /^\/(blog\/)(([\w-]{1,100})|(\[slug\]))$/,
};

export default NAVIGATION;
