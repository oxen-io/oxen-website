import { METADATA } from '../constants';
import { titleCase } from './text';

// DELETE THIS FILE WHEN DONE

// TODO Remove since it should be generated in custom head
export function generateTitle(prefix: string) {
  return prefix ? `${titleCase(prefix)} - ${METADATA.TITLE}` : METADATA.TITLE;
}

export function generateURL(prefix: string) {
  return prefix ? `${METADATA.HOST_URL}${prefix}` : METADATA.HOST_URL;
}
