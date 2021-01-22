import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
// import _404 from '../assets/svgs/404.svg';
import { UI } from '../constants';
import { ScreenContext } from '../contexts/screen';
import { generateTitle } from '../utils/metadata';

function oxen404() {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);

  const wrapperStyles = {
    width: '100%',
    maxWidth: '760px',
    margin: isDesktop ? '50px auto 100px' : '-10px auto',
    paddingLeft: isHuge ? '0' : '5vw',
    paddingRight: isHuge ? '0' : '5vw',
    paddingBottom: !isDesktop ? '33px' : '0px',
  };

  const svgStyles = {
    top: isDesktop ? '125px' : isTablet ? '20px' : '85px',
    left: isDesktop ? '-50px' : isTablet ? '30vw' : '-65px',
    width: isDesktop ? '810px' : isTablet ? '833px' : '933px',
  };

  const _404SectionStyles = {
    top: isDesktop ? '45px' : isTablet ? '35px' : '25px',
  };

  const _404TitleStyles = {
    lineHeight: '0px',
    paddingTop: '2.3rem',
    paddingBottom: '3.3rem',
  };

  const _404TextStyles = {
    lineHeight: '1.15em',
  };

  const absoluteBoxStyles = {
    marginTop: isTablet ? '20px' : '0px',
    minHeight: isTablet ? '330px' : '450px',
  };

  const goBackHomeStyles = {
    width: '9rem',
  };

  return (
    <div>
      <Head>
        <title>{generateTitle('404')}</title>
      </Head>

      <div style={wrapperStyles} className="flex items-center">
        <div
          className={classNames(
            'flex w-full justify-between',
            !isDesktop && 'flex-col',
          )}
        >
          <div style={absoluteBoxStyles} className="relative w-full flex">
            {/* <_404 style={svgStyles} className="absolute top-0 z-0" /> */}
            <div style={_404SectionStyles} className="absolute left-0 z-50">
              <h1
                style={_404TitleStyles}
                className="font-roboto text-primary text-sevenxl text-opacity-25 -mb-4"
              >
                404
              </h1>
              <p
                style={_404TextStyles}
                className="font-roboto text-primary text-fourxl tracking-tight"
              >
                Nothing found here.
              </p>

              <Link href="/">
                <div
                  role="button"
                  style={goBackHomeStyles}
                  className={classNames(
                    'bg-secondary',
                    'cursor-pointer',
                    'mt-3',
                    'text-white',
                    'font-roboto',
                    'px-3',
                    'py-1',
                    'w-32',
                    'select-none',
                    'rounded-lg',
                    'text-center',
                    'tracking-tight',
                    isMobile ? 'text-lg' : 'text-sm',
                  )}
                >
                  Discover food
                </div>
              </Link>
            </div>
          </div>

          <div
            className={classNames(
              'z-10 flex items-start',
              isMobile ? '-mt-10' : 'mt-0',
            )}
          >
            <div className="flex-col flex-grow z-50 my-4">
              <h2
                className={classNames(
                  'text-primary font-roboto font-semibold ml-1 font-roboto mt-6 text-twoxl whitespace-no-wrap',
                )}
              >
                Something went wrong?
              </h2>

              <textarea
                maxLength={UI.USER_QUERY_404_MAX_LEN}
                placeholder="Let us know what you were looking for and we'll get back to you soon."
                className="border-secondary border-2 rounded-xl focus:outline-none focus:border-primary placeholder-primary placeholder-opacity-50 w-full h-48 px-3 py-3 resize-none"
              />
              <input
                type="text"
                placeholder="Email address..."
                className="mt-2 border-secondary border-2 rounded-xl focus:outline-none focus:border-primary py-2 placeholder-primary placeholder-opacity-50 w-full pl-3 pt-3 pr-1"
              />

              <div
                role="button"
                className={classNames(
                  'bg-primary cursor-pointer mt-4 text-white font-roboto px-4 py-2 select-none rounded-lg text-center',
                  isMobile ? 'text-lg' : 'text-sm',
                  isMobile ? 'w-full' : 'w-4/12',
                )}
              >
                Send
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default oxen404;
