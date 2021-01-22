import classNames from 'classnames';
import _ from 'lodash';
import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { ScreenContext } from '../../contexts/screen';

interface Props {
  children: JSX.Element[];
}

export function CardGrid({ children }: Props) {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);

  return (
    <div className="flex flex-col space-y-4">
      {_.chunk(children, isHuge ? 4 : isDesktop || isTablet ? 3 : 2).map(
        group => (
          <div key={uuid()} className="flex">
            {group.map((item, index) => (
              <div
                key={uuid()}
                className={classNames(
                  index === 0 && 'pr-2',
                  index === 1 && 'pl-2 pr-2',
                  index === 2 && 'pl-2',
                  isHuge ? 'w-1/4' : isDesktop || isTablet ? 'w-1/3' : 'w-1/2',
                )}
              >
                {item}
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  );
}
