import { METADATA } from '../constants';
import { titleCase } from './text';

export function generateTitle(prefix: string) {
  return prefix
    ? `${titleCase(prefix)} - ${METADATA.TITLE_SUFFIX}`
    : METADATA.TITLE_SUFFIX;
}
