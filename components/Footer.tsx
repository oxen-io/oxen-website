import Link from 'next/link';
import React from 'react';
import { Contained } from './Contained';

export function Footer() {
  return (
    <div className="bg-primary py-6 text-center mt-10">
      <Contained>
        <div className="font-roboto text-base text-white font-medium desktop:text-sm">
          <div className="flex justify-center mt-2 mb-6 cursor-pointer">
            <Link href="/"></Link>
          </div>
          <div className="flex flex-col mt-3">
            <Link href="/">
              <a className="mb-1 mt-0">Home</a>
            </Link>

            <Link href="/about">
              <a className="mb-1 mt-0">About Us</a>
            </Link>
            <Link href="/privacy">
              <a className="mb-1 mt-0">Privacy</a>
            </Link>
          </div>
        </div>
      </Contained>
    </div>
  );
}
