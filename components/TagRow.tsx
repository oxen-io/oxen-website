import React from 'react';
import { TagBlock } from './TagBlock';

interface Props {
  tags: string[];
}

export function TagRow({ tags }: Props) {
  return (
    <div
      style={{
        height: 'calc(1rem + 2px)',
      }}
      className="flex flex-wrap space-x-2 overflow-hidden"
    >
      {tags
        .filter(tag => Boolean(tag))
        // Maximum of three tags
        .slice(0, 3)
        .map(tag => (
          <TagBlock key={tag} tag={tag} />
        ))}
    </div>
  );
}
