const CMS = {
  SHORTCODE_REGEX: /^\{\{[\w\s]{1,99}\}\}$/,
  SHORTCODES: {
    GITHUB_LINKS: /^\{\{[\s]*github_links[\s]*\}\}$/,
    BUILD_OXEN: /^\{\{[\s]*build_oxen[\s]*\}\}$/,
    GENERAL_BUTTON: /^\{\{[\s]*button[\s]*href="[^"]{1,99}"[\s]*text="[\w\s]{1,33}"[\s]*\}\}$/,
  },
};

export default CMS;
