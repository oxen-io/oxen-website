export interface IMenuItem {
  label: string;
  href: string;
}

export const menuItems: IMenuItem[] = [
  { label: 'Stack', href: '/stack' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Build', href: '/build' },
  { label: 'Contact', href: '/contact' },
];
