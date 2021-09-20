import Image from 'next/image';
import heroUrl from '../public/hero.svg';

export function HomeHero() {
  return (
    <div
      style={{
        transform: ``,
        // Make image expand into sidebar direction
        direction: 'rtl',
      }}
    >
      <Image
        className="absolute bottom-0 left-0 object-cover h-full min-w-full transform"
        src={heroUrl}
        alt="Hero Landing Page, depicting the integration of privacy and technology"
        layout="fill"
        priority={true}
      />
    </div>
  );
}
