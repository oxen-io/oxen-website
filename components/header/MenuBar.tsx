import React from 'react';
import FacebookSVG from '../../assets/svgs/socials/facebook.svg';
import InstargamSVG from '../../assets/svgs/socials/instagram.svg';
import TwitterSVG from '../../assets/svgs/socials/twitter.svg';
import { UI } from '../../constants';
import { Button } from '../Button';

export function MenuBar() {
  return (
    <div
      style={{
        height: `${UI.MENUBAR_HEIGHT_PX}px`,
      }}
      className="flex items-center justify-end w-full space-x-4 px-6"
    >
      <a
        href="#"
        className="hover:underline text-primary text-sm font-semibold"
      >
        Whitepaper
      </a>
      <FacebookSVG />
      <TwitterSVG />
      <InstargamSVG />
      <Button size="small">SUPPORT</Button>
    </div>
  );
}
