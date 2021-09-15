import classNames from 'classnames';
import React from 'react';

interface Props {
  tag: string;
  size?: 'small' | 'medium' | 'large';
  classes?: string;
}

export function TagBlock(props: Props) {
  const { tag, size = 'small', classes } = props;
  const href = `/blog?tag=${tag.toLowerCase()}`;

  return (
    <a
      href={href}
      style={{ width: 'min-content' }}
      className={classNames(
        'flex items-center cursor-pointer rounded-full whitespace-nowrap border border-secondary bg-secondary bg-opacity-25 text-primary font-thin',
        size === 'small' && 'h-4 text-xs',
        size === 'medium' && 'h-5 text-sm',
        size === 'medium' && 'h-6 text-base',
        classes,
      )}
    >
      <span className="px-2">{tag.toLowerCase()}</span>
    </a>
  );
}
