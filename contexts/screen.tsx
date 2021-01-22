import React, { useEffect } from 'react';
import { useScreenSize } from '../hooks/screen';

interface IScreen {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isHuge: boolean;
}

export const ScreenContext = React.createContext(undefined);

const ScreenProvider = ({ children }) => {
  const screenParams: IScreen = useScreenSize();

  useEffect(() => {
    console.log('screen ➡️ screenParams.isMobile:', screenParams.isMobile);
    console.log('screen ➡️ screenParams.isTablet:', screenParams.isTablet);
    console.log('screen ➡️ screenParams.isDesktop', screenParams.isDesktop);
    console.log('screen ➡️ screenParams.isHuge', screenParams.isHuge);
  }, [screenParams]);

  return (
    <ScreenContext.Provider value={screenParams}>
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenProvider;
