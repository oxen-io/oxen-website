import { METADATA } from '../constants';
import { titleCase } from './text';

export function generateTitle(prefix: string) {
  return prefix ? `${titleCase(prefix)} - ${METADATA.TITLE}` : METADATA.TITLE;
}

export function generateURL(prefix: string) {
  return prefix ? `${METADATA.HOST_URL}${prefix}` : METADATA.HOST_URL;
}
