export const generateURL = (slug: string) => {
  // Trim slug and remove slashes
  const trimmed = slug.trim().replace('/', '');

  // Route to 404 if the link is invalid
  if (!trimmed || !trimmed.length) {
    return { href: '/404', as: '/404' };
  }

  return {
    href: '/blog/[slug]/',
    as: `/blog/${trimmed}`.toLowerCase(),
  };
};
