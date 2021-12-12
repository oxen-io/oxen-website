import Link from 'next/link';
import { useRouter } from 'next/router';
// import { ReactComponent as HomeSVG } from '@/assets/svgs/home-primary.svg';

export function Breadcrumbs() {
  const router = useRouter();
  const path = router.asPath.split('/').filter(i => Boolean(i));

  console.log('Breadcrumbs ➡️   path:', path);

  return (
    <div className="flex items-center font-sans">
      {/* <HomeSVG className="w-4 h-4 mr-1 fill-current text-primary" /> */}
      <span className="last:font-medium">
        {path.map((item, index) => (
          <Link key={item} href={`/${path.slice(0, index + 1)?.join('/')}`}>
            <a>
              <span className="font-normal opacity-75"> {'>'} </span>
              <span className="text-primary">{item}</span>
            </a>
          </Link>
        ))}
      </span>
    </div>
  );
}
