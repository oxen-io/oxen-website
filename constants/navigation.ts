import { ISideMenuItem } from '../components/navigation/SideMenu';
import { SideMenuItem } from '../state/navigation';

export interface IMenuItem {
  label: string;
  href: string;
}

const MENU_ITEMS: IMenuItem[] = [
  { label: 'Docs', href: '/' },
  { label: 'Dev Updates', href: '/' },
  { label: 'CoinGecko', href: '/' },
  { label: 'Wallet', href: '/' },
  { label: 'Explorer', href: '/' },
  { label: 'Community', href: '/blog' },
  { label: 'Technology', href: '/blog' },
];

// TODO - Put SIDE_MENU_ITEMS in Contentful and fetch them server side.
const SIDE_MENU_ITEMS = {
  [SideMenuItem.WHO_ARE_WE]: {
    id: 1,
    label: 'Who are we',
  },
  [SideMenuItem.MISSION]: {
    id: 2,
    label: 'Our mission',
  },
  [SideMenuItem.BUY_OXEN]: {
    id: 3,
    label: 'Why buy Oxen?',
  },
  [SideMenuItem.TOOLS]: {
    id: 4,
    label: 'What are our tools?',
  },
  [SideMenuItem.BUILD]: {
    id: 5,
    label: 'How can I build?',
  },
  [SideMenuItem.SUPPORT]: {
    id: 6,
    label: 'I need support',
  },
  [SideMenuItem.LEARN_MORE]: {
    id: 7,
    label: 'How can I find more?',
  },
  [SideMenuItem.BLOG]: {
    id: 8,
    label: 'Our blog',
    href: '/blog',
  },
} as { [name: string]: ISideMenuItem };

const NAVIGATION = {
  MENU_ITEMS,
  SIDE_MENU_ITEMS,
};

export default NAVIGATION;
