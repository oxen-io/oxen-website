import { METADATA } from '../constants';

// REFERENCE
// https://crunchify.com/list-of-all-social-sharing-urls-for-handy-reference-social-media-sharing-buttons-without-javascript/

const shareURL = (title: string, url: string) => {
  console.log('Sharing title:, ', title);
  console.log('Sharing URL: ', url);

  // Attempt to use native share API
  if (navigator.share) {
    navigator.share({ title, url });
    return;
  }

  // Fallback to in-browser sharing
  if (typeof window === 'undefined') {
    return;
  }

  window.open(url, '_blank');
};

const buildUrl = (path: string) => {
  // Add '/' to beginning if it doesn't
  const beautifiedPath = encodeURI(path.trim().toLowerCase());

  return METADATA.OXEN_HOST_URL + `${path[0] !== '/' && ''}` + beautifiedPath;
};

export const shareToFacebook = (title: string, path: string) => {
  // Path should have format of /path/to/content/
  // and will be expanded to the format: https://oxen.io/path/to/format
  const oxenUrl = buildUrl(path);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${oxenUrl}`;
  shareURL(title, shareUrl);
};

export const shareToWhatsApp = (title: string, path: string) => {
  // Path should have format of /path/to/content/
  // and will be expanded to the format: https://oxen.io/path/to/format
  const oxenUrl = buildUrl(path);
  const shareUrl = `https://api.whatsapp.com/send?text=${title} ${oxenUrl}`;
  shareURL(title, shareUrl);
};

export const shareToTwitter = (title: string, path: string) => {
  // Path should have format of /path/to/content/
  // and will be expanded to the format: https://oxen.io/path/to/format
  const oxenUrl = buildUrl(path);
  const shareUrl = `https://twitter.com/share?url=${oxenUrl}&text=${title}`;
  //   &via=[via]&hashtags=[hashtags]
  //   https://api.whatsapp.com/send?text=${title} ${oxenUrl}`;
  shareURL(title, shareUrl);
};

export const shareToReddit = (title: string, path: string) => {
  // Path should have format of /path/to/content/
  // and will be expanded to the format: https://oxen.io/path/to/format
  const oxenUrl = buildUrl(path);
  const shareUrl = `https://reddit.com/submit?url=${oxenUrl}&title=${title}`;
  shareURL(title, shareUrl);
};
