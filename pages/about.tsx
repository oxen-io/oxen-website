import Head from 'next/head';
import { generateTitle } from '../utils/metadata';

export default function About(): JSX.Element {
  return (
    <div>
      <Head>
        <title>{generateTitle('About')}</title>
      </Head>

      <h1 className="text-center text-xl m-6">About</h1>
    </div>
  );
}
