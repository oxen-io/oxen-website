import { ISideMenuItem } from '../components/navigation/SideMenu';
import { SideMenuItem } from '../state/navigation';

export interface IMenuItem {
  label: string;
  href: string;
}

const MENU_ITEMS: IMenuItem[] = [
  { label: 'Docs', href: '/' },
  // { label: 'Dev Updates', href: '/' },
  { label: 'CoinGecko', href: '/' },
  { label: 'Wallet', href: '/' },
  { label: 'Explorer', href: '/' },
  { label: 'Community', href: '/' },
  { label: 'Tech', href: '/' },
];

// TODO - Put SIDE_MENU_ITEMS in Contentful and fetch them server side.
const SIDE_MENU_ITEMS = {
  [SideMenuItem.WHO_ARE_WE]: {
    id: 1,
    label: 'Who are we',
    href: '/',
  },
  [SideMenuItem.MISSION]: {
    id: 2,
    label: 'Our mission',
    href: '/mission',
  },
  [SideMenuItem.TRADE]: {
    id: 3,
    label: 'Why buy Oxen?',
    href: '/trade',
  },
  [SideMenuItem.TOOLS]: {
    id: 4,
    label: 'What are our tools?',
    href: '/tools',
  },
  [SideMenuItem.BUILD]: {
    id: 5,
    label: 'How can I build?',
    href: '/build',
  },
  [SideMenuItem.SUPPORT]: {
    id: 6,
    label: 'I need support',
    href: '/support',
  },
  [SideMenuItem.LEARN_MORE]: {
    id: 7,
    label: 'How can I find more?',
    href: '/explore',
  },
  [SideMenuItem.BLOG]: {
    id: 8,
    label: 'Our blog',
    href: '/blog',
  },
} as { [name: string]: ISideMenuItem };

// Pages in which the sidebar breaks out of the split view
const SIDEBAR_OVERLAY_PAGES = ['blog'];

const NAVIGATION = {
  MENU_ITEMS,
  SIDE_MENU_ITEMS,
  OVERLAY_PAGE_REGEX: new RegExp(
    `^/(${SIDEBAR_OVERLAY_PAGES.map(i => `(${i})`).join('|')})[/]?`,
  ),
};

export default NAVIGATION;
