import classNames from 'classnames';
import { useContext } from 'react';
import CustomHead from '../components/CustomHead';
// import _404 from '../assets/svgs/404.svg';
import { UI, METADATA } from '../constants';
import { ScreenContext } from '../contexts/screen';

function oxen404() {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);

  const wrapperStyles = {
    width: '100%',
    maxWidth: '760px',
    margin: isDesktop ? '50px auto 100px' : '-10px auto',
    paddingLeft: isHuge ? '0' : `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
    paddingRight: isHuge ? '0' : `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
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

  return (
    <div className="flex items-center justify-center flex-grow h-full">
      <CustomHead title={'404'} metadata={METADATA[404]} />

      <div style={wrapperStyles} className="flex items-center flex-grow">
        <div
          className={classNames(
            'flex w-full justify-between',
            !isDesktop && 'flex-col',
          )}
        >
          <div style={absoluteBoxStyles} className="relative flex w-full">
            {/* <_404 style={svgStyles} className="absolute top-0 z-0" /> */}
            <div style={_404SectionStyles} className="absolute left-0 z-50">
              <h1
                style={_404TitleStyles}
                className="-mb-4 font-sans text-opacity-25 text-primary text-8xl"
              >
                404
              </h1>
              <p
                style={_404TextStyles}
                className="font-sans text-4xl tracking-tight text-primary"
              >
                Nothing found here.
              </p>
            </div>
          </div>

          <div
            className={classNames(
              'z-10 flex items-start',
              isMobile ? '-mt-10' : 'mt-0',
            )}
          >
            <div className="z-50 flex-col flex-grow my-4">
              <h2
                className={classNames(
                  'text-primary font-sans font-semibold ml-1 mt-6 text-twoxl whitespace-no-wrap',
                )}
              >
                Something went wrong?
              </h2>

              <textarea
                maxLength={UI.USER_QUERY_404_MAX_LEN}
                placeholder="Let us know what you were looking for and we'll get back to you soon."
                className="w-full h-48 px-3 py-3 placeholder-opacity-50 border-2 resize-none border-secondary rounded-xl focus:outline-none focus:border-primary placeholder-primary"
              />
              <input
                type="text"
                placeholder="Email address..."
                className="w-full py-2 pt-3 pl-3 pr-1 mt-2 placeholder-opacity-50 border-2 border-secondary rounded-xl focus:outline-none focus:border-primary placeholder-primary"
              />

              <div
                role="button"
                className={classNames(
                  'bg-primary cursor-pointer mt-4 text-white font-sans px-4 py-2 select-none rounded-lg text-center',
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
