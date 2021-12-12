import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useScroll, useWindowSize } from 'react-use';

import { Contained } from '@/components/Contained';
import { ScreenContext } from '@/contexts/screen';
import { UI } from '@/constants';
import classNames from 'classnames';

interface Props {
  onScroll?: (x: number) => void;
  onItemClick?: () => void;
  children: ReactNode;
}

export function HorizontalScrollable(props: Props) {
  const { isDesktop } = useContext(ScreenContext);

  return (
    <>
      {!isDesktop ? (
        <HorizontalScrollableInner {...props} />
      ) : (
        <Contained>
          <HorizontalScrollableInner {...props} />
        </Contained>
      )}
    </>
  );
}

function HorizontalScrollableInner(props: Props) {
  const { onItemClick, children } = props;

  const scrollRef = useRef(null);
  const innerContentRef = useRef(null);

  const { x } = useScroll(scrollRef);
  const pageWidth = useWindowSize().width;
  const scrollDistance = pageWidth > 1400 ? 450 : pageWidth / 3;

  const [rightScrollHidden, setRightScrollHidden] = useState(false);

  const { isDesktop } = useContext(ScreenContext);

  const handleLeftScroll = () => {
    scrollRef.current.scrollBy({
      left: -scrollDistance,
      behavior: 'smooth',
    });
  };

  const handleRightScroll = () => {
    scrollRef.current.scrollBy({
      left: scrollDistance,
      behavior: 'smooth',
    });
  };

  function handleItemClick() {
    if (onItemClick) {
      onItemClick();
    }
  }

  useEffect(() => {
    const isFullRight =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth ===
      scrollRef.current.scrollLeft;

    const tooSmallToScroll =
      innerContentRef.current.clientWidth < scrollRef.current.clientWidth;

    setRightScrollHidden(tooSmallToScroll || isFullRight);
  }, [x, children]);

  return (
    <div className="relative flex w-full">
      <div
        className={classNames(
          'absolute left-0 flex items-center justify-between h-full w-full',
          !isDesktop && 'hidden',
        )}
      >
        <div
          className={classNames(
            'flex flex-col justify-center h-full z-50 duration-300 -ml-8',
            x <= 1 && 'opacity-0',
          )}
        >
          <LeftOutlined
            onClick={handleLeftScroll}
            className={classNames('h-20 mt-1 cursor-pointer')}
          />
        </div>

        <div
          className={classNames(
            'flex flex-col justify-center h-full z-50 duration-300 -mr-8',
            rightScrollHidden && 'opacity-0',
          )}
        >
          <RightOutlined
            onClick={handleRightScroll}
            className="h-20 mt-1 cursor-pointer"
          />
        </div>
      </div>
      <div
        ref={scrollRef}
        className={classNames(
          'relative',
          'w-full',
          'hide_scroll',
          'scrolling-touch hide-scroll',
          isDesktop ? 'overflow-x-scroll' : 'overflow-x-scroll',
        )}
      >
        <div
          ref={innerContentRef}
          className={classNames('flex space-x-8 overflow-y-visible')}
          style={{
            width: 'min-content',
            marginLeft: `${!isDesktop ? UI.PAGE_CONTAINED_PADDING_VW : 0}vw`,
            paddingRight: `${!isDesktop ? UI.PAGE_CONTAINED_PADDING_VW : 0}vw`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
