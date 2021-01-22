import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { UI } from '../constants';

export function useScreenSize() {
  // Default to mobile view
  // const isMobile = useMedia(`(max-width: ${UI.TABLET_BREAKPOINT}px)`, true);
  // const isTablet = useMedia(
  //   `(min-width: ${UI.MOBILE_BREAKPOINT}px) and  (max-width: ${UI.TABLET_BREAKPOINT}px)`,
  //   false,
  // );
  // const isDesktop = useMedia(`(min-width: ${UI.TABLET_BREAKPOINT}px)`, false);
  // const isHuge = useMedia(`(min-width: ${UI.DESKTOP_BREAKPOINT}px)`, false);

  // console.log('screen ➡️ isMobile:', isMobile);
  // console.log('screen ➡️ isTablet:', isTablet);
  // console.log('screen ➡️ isDesktop:', isDesktop);
  // console.log('screen ➡️ isHuge:', isHuge);

  // Use width rather than media queries for improved performance.
  const { width } = useWindowSize();

  // Default to mobile view
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHuge, setIsHuge] = useState(false);

  useEffect(() => {
    const _isMobile = width <= UI.TABLET_BREAKPOINT;
    const _isTablet =
      width > UI.MOBILE_BREAKPOINT && width <= UI.TABLET_BREAKPOINT;
    const _isDesktop = width > UI.TABLET_BREAKPOINT;
    const _isHuge = width > UI.DESKTOP_BREAKPOINT;

    if (isMobile !== _isMobile) setIsMobile(_isMobile);
    if (isTablet !== _isTablet) setIsTablet(_isTablet);
    if (isDesktop !== _isDesktop) setIsDesktop(_isDesktop);
    if (isHuge !== _isHuge) setIsHuge(_isHuge);
  }, [width]);

  return { isMobile, isTablet, isDesktop, isHuge };
}
