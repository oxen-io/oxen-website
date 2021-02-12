import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  bold?: boolean;
  indent?: boolean;
}

export function ArticleCallout({ children, bold, indent }: Props) {
  return (
    <p
      className={classNames(
        'pl-4 mb-8 italic border-l-2 border-opacity-25 border-primary',
        bold && 'font-semibold',
        indent && 'ml-6',
      )}
    >
      {children}
    </p>
  );
}
