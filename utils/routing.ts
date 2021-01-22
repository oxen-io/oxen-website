export const generateURL = (slug: string) => {
  // Route to 404 if the link is invalid
  if (!slug || !slug.length) {
    return { href: '/404', as: '/404' };
  }

  return {
    href: `/blog/${slug && '/[slug]'}`.toLowerCase(),
    as: `/blog/}${slug && '/' + slug}`.toLowerCase(),
  };
};
