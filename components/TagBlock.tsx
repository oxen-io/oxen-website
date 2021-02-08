import classNames from 'classnames';
import React from 'react';

interface Props {
  tag: string;
}

export function TagBlock(props: Props) {
  const { tag } = props;
  const href = `/blog?tag=${tag.toLowerCase()}`;

  return (
    <a
      href={href}
      className={classNames(
        'px-2 text-xs cursor-pointer rounded-full border border-secondary bg-secondary bg-opacity-25 text-primary font-thin',
      )}
    >
      <p className="flex items-center h-4">{tag.toLowerCase()}</p>
    </a>
  );
}
