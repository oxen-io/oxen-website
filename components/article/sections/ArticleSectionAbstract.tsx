import React, { ReactNode } from 'react';
import { ILocation } from '../../../types/article';
import { Contained } from '../../Contained';

interface Props {
  city: string;
  location: ILocation;
  children?: ReactNode;
}

export function ArticleSectionAbstract(props: Props) {
  const { city, location, children } = props;

  return (
    <Contained backgroundColor="secondary-1">
      <div className="flex flex-col items-center desktop:pt-6 mb-16 space-y-10">
        {children}
      </div>
    </Contained>
  );
}
