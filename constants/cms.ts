import isLive from '@/utils/environment';

interface IShortcodeButton {
  regex: RegExp;
  text: string;
  href?: string;
}

// prettier-ignore
const SHORTCODE_BUTTONS: { [key: string]: IShortcodeButton } = {
  BUILD_OXEN: {
    regex: /^\{\{[\s]*build_oxen[\s]*\}\}$/,
    text: "Build with Oxen",
    href: "https://docs.oxen.io/building-with-oxen" 
  },
  STAKING_GUIDE_BUTTON: {
    regex: /^{{[\s*]staking_guide_button[\s*]}}$/,
    text: "Staking guide",
    href:
      'https://docs.oxen.io/using-the-oxen-blockchain/oxen-service-node-guides',
  },
};

const CMS = {
  SHORTCODE_REGEX: /\{\{.*\}\}/,
  SHORTCODE_BUTTONS,
  SHORTCODES: {
    GENERAL_BUTTON: /\{\{[\s]*button[\s]*href="[^"]{1,333}"[\s]*text="[\w\s]{1,33}"[\s]*\}\}/,
    GITHUB_LINKS: /^\{\{[\s]*github_links[\s]*\}\}$/,
    COMMUNITY_LINKS: /^{{[\s*]community_links[\s*]}}$/,
    TRADE_LINKS: /^{{[\s*]trade_links[\s*]}}$/,
    CTA_WHO_USES_OXEN: /^\{\{[\s]*who_uses_oxen[\s]*\}\}$/,
    CTA_SESSION_LOKINET: /^\{\{[\s]*session_lokinet[\s]*\}\}$/,
    CTA_EMAIL_SIGNUP: /^\{\{[\s]*email_signup[\s]*\}\}$/,
  },
  BLOG_RESULTS_PER_PAGE: 13,
  BLOG_RESULTS_PER_PAGE_TAGGED: 12,
  // Next.js will try and re-build the page when a request comes in
  // every 10 minutues for production and every 30 seconds for staging
  CONTENT_REVALIDATE_RATE: isLive() ? 600 : 30,
};

export default CMS;
