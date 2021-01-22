import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Contained } from '../components/Contained';
import { ColorPalette } from '../components/design/DesignColorPalette';
import { generateTitle } from '../utils/metadata';

export default function Design(): JSX.Element {
  const router = useRouter();

  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) {
    router.push('/');
    return null;
  }

  return (
    <div>
      <Head>
        <title>{generateTitle('Design')}</title>
      </Head>

      <Contained>
        <ColorPalette />
      </Contained>
    </div>
  );
}
