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
    label: 'What is Oxen?',
    href: '/who-are-we',
  },
  [SideMenuItem.BUY_OXEN]: {
    id: 2,
    label: 'Why buy $OXEN?',
    href: '/buy-oxen',
  },
  [SideMenuItem.STAKE]: {
    id: 3,
    label: 'How do I stake $OXEN?',
    href: '/stake',
  },
  [SideMenuItem.USES]: {
    id: 4,
    label: 'Who uses Oxen?',
    href: '/uses',
  },
  [SideMenuItem.BUILD]: {
    id: 5,
    label: 'What can be built?',
    href: '/build',
  },
  [SideMenuItem.SESSION_LOKINET]: {
    id: 6,
    label: 'Session & Lokinet',
    href: '/session-lokinet',
  },
  [SideMenuItem.GET_INVOLVED]: {
    id: 7,
    label: 'Get involved',
    href: '/get-involved',
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
