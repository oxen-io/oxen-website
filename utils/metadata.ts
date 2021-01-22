import { METADATA } from '../constants';

export function generateTitle(prefix: string) {
  return `${prefix} | ${METADATA.TITLE_SUFFIX}`;
}
