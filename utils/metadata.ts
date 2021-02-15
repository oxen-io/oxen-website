import { METADATA } from '../constants';

export function generateTitle(prefix: string) {
  return prefix
    ? `${prefix} - ${METADATA.TITLE_SUFFIX}`
    : METADATA.TITLE_SUFFIX;
}
