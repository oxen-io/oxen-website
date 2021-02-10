export interface IMenuItem {
  label: string;
  href: string;
  newTab: boolean;
  subtle: boolean;
  external: boolean;
}

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
  BLOG_REGEX: /^\/(blog)[?tag=[\w]*]?$/,
  POST_REGEX: /^\/(blog\/)(([\w-]{1,100})|(\[slug\]))$/,
};

export default NAVIGATION;
