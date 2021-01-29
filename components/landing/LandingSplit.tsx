import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  titleSize?: '6xl' | '7xl' | '8xl' | '9xl';
  subtitle?: string;
  children?: ReactNode;
}

export function LandingSplit({
  title,
  titleSize = '7xl',
  subtitle,
  children,
}: Props) {
  return (
    <div className="w-6/12">
      {title && (
        <h1
          className={classNames(
            `text-${titleSize}`,
            'font-prompt font-medium leading-tight mb-6',
          )}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <h2 className="font-prompt font-medium text-4xl">{subtitle}</h2>
      )}
      {children}
    </div>
  );
}
