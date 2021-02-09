import classNames from 'classnames';
import _ from 'lodash';
import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { ScreenContext } from '../../contexts/screen';
import { Contained } from '../Contained';
import { HorizontalScrollable } from '../HorizontalScrollable';

interface Props {
  children: JSX.Element[];
}

export function CardGrid({ children }: Props) {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);

  const spacing = isHuge ? 4 : isDesktop ? 6 : 4;
  const spacingY = `space-y-${spacing}`;
  const spacingX = `space-x-${spacing}`;

  const grouping = isHuge ? 4 : isDesktop ? 3 : isTablet ? 2 : 1;
  const numPaddingCards =
    Math.ceil(children.length / grouping) * grouping - children.length;

  // Add cards to ensure we fill up each row. Hidden where the row is incomplete
  // to keep even widths
  const cards = [
    ...children,
    ...Array.from(Array(numPaddingCards).keys()).map(i => <div key={i}></div>),
  ];

  return (
    <>
      {isMobile ? (
        <div className="">
          <HorizontalScrollable>
            {children.map(child => (
              <div
                key={uuid()}
                style={{
                  width: '80vw',
                  minWidth: '275px',
                  maxWidth: '330px',
                }}
                className="py-4"
              >
                {child}
              </div>
            ))}
          </HorizontalScrollable>
        </div>
      ) : (
        <Contained>
          <div className={classNames('flex flex-col', spacingY)}>
            {_.chunk(cards, grouping).map(group => (
              <div key={uuid()} className={classNames('flex w-full', spacingX)}>
                {group.map(item => (
                  <div key={uuid()} className="flex-1">
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Contained>
      )}
    </>
  );
}
