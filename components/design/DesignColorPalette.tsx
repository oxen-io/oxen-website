import React from 'react';
import { SectionTitle } from '../SectionTitle';

export function ColorPalette() {
  return (
    <>
      <div className="pt-10 pb-4">
        <SectionTitle>Color Palette</SectionTitle>
      </div>
      <div className="flex pb-10 space-x-4">
        <div className="flex flex-col space-y-3 font-roboto">
          <div className="flex justify-center items-center w-8 h-8 text-threexl">
            0
          </div>
          <div className="flex justify-center items-center w-8 h-8 text-threexl">
            1
          </div>
          <div className="flex justify-center items-center w-8 h-8 text-threexl">
            2
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="w-8 h-8 rounded-lg bg-primary"></div>
          <div className="w-8 h-8 rounded-lg bg-primary-1"></div>
          <div className="w-8 h-8 rounded-lg bg-primary-2"></div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="w-8 h-8 rounded-lg bg-secondary"></div>
          <div className="w-8 h-8 rounded-lg bg-secondary-1"></div>
          <div className="w-8 h-8 rounded-lg bg-secondary-2"></div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="w-8 h-8 rounded-lg bg-alt"></div>
          <div className="w-8 h-8 rounded-lg bg-alt-1"></div>
          <div className="w-8 h-8 rounded-lg bg-alt-2"></div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="w-8 h-8 rounded-lg bg-subtle"></div>
          <div className="w-8 h-8 rounded-lg bg-subtle-1"></div>
          <div className="w-8 h-8 rounded-lg bg-subtle-2"></div>
        </div>

        <div className="flex flex-col space-y-3 justify-end">
          <div className="w-8 h-8 rounded-lg bg-soft"></div>
          <div className="w-8 h-8 rounded-lg bg-soft-1"></div>
        </div>

        <div className="flex flex-col w-8"></div>

        <div className="flex flex-col space-y-3 justify-end">
          <div className="w-8 h-8 rounded-lg bg-aux-orange"></div>
        </div>

        <div className="flex flex-col space-y-3 justify-end">
          <div className="w-8 h-8 rounded-lg bg-aux-brown"></div>
          <div className="w-8 h-8 rounded-lg bg-aux-green"></div>
        </div>

        <div className="flex flex-col space-y-3 justify-end">
          <div className="w-8 h-8 rounded-lg bg-aux-beige"></div>
          <div className="w-8 h-8 rounded-lg bg-aux-blue"></div>
        </div>
      </div>
    </>
  );
}
