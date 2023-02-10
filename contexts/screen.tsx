import React from 'react';
import { useScreenSize } from '@/hooks/screen';

interface IScreen {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isHuge: boolean;
  isEnormous: boolean;
  width: number;
}

export const ScreenContext = React.createContext({
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isHuge: false,
  isEnormous: false,
  width: 0,
});

const ScreenProvider = ({ children }) => {
  const screenParams: IScreen = useScreenSize();

  return (
    <ScreenContext.Provider value={screenParams}>
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenProvider;
