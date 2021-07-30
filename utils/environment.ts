export default function isLive(): boolean {
  // only show 'live' content in production
  return process.env.SITE_ENV === 'production' ? true : false;
}
