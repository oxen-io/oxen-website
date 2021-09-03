import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  bold?: boolean;
  indent?: boolean;
}

export function ArticleCallout({ children, bold, indent }: Props) {
  return (
    <div
      className={classNames(
        'border-primary border-l-2 border-opacity-25 pl-4 mb-8 mt-6',
        bold && 'font-semibold',
        indent && 'ml-6',
      )}
    >
      <blockquote className={classNames('italic')}>{children}</blockquote>
    </div>
  );
}
