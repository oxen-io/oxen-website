import React, { useContext } from 'react';

import { Contained } from '@/components/Contained';
import { HorizontalScrollable } from '@/components/HorizontalScrollable';
import { ScreenContext } from '@/contexts/screen';
import _ from 'lodash';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import { v4 as uuid } from 'uuid';

interface Props {
  rows?: number;
  children: JSX.Element[];
}

export function CardGrid({ rows, children }: Props) {
  const { isDesktop, isHuge, isEnormous } = useContext(ScreenContext);

  const [ref, { width }] = useMeasure();
  const widthOfCardPx = 200;
  const grouping = Math.max(1, Math.min(4, Math.floor(width / widthOfCardPx)));
  const numPaddingCards =
    Math.ceil(children.length / grouping) * grouping - children.length;

  const spacing = (isHuge || isEnormous) ? 3 : isDesktop ? 6 : 4;
  const spacingY = `space-y-${spacing}`;
  const spacingX = `space-x-${spacing}`;

  const items =
    rows && rows > 0 ? children.slice(0, grouping * rows) : children;

  // Add cards to ensure we fill up each row. Hidden where the row is incomplete
  // to keep even widths
  const cards = [
    ...items,
    ...Array.from(Array(numPaddingCards).keys()).map(i => <div key={i}></div>),
  ];

  return (
    <>
      {
        <Contained>
          <div ref={ref} className={classNames('flex flex-col', spacingY)}>
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
      }
    </>
  );
}
