import React from 'react';
import { TagBlock } from './TagBlock';

interface Props {
  limit?: number;
  tags: string[];
  size?: 'small' | 'medium' | 'large';
}

export function TagRow({ tags, limit, size }: Props) {
  return (
    <div
      style={{
        height: `calc(${
          size === 'large' ? '1.5' : size === 'medium' ? '1.25' : '1'
        }rem + ${size === 'large' ? '7' : size === 'medium' ? '5' : '2'}px)`,
      }}
      className="flex flex-wrap space-x-2 overflow-hidden"
    >
      {tags
        .filter(tag => Boolean(tag))
        // Maximum of three tags
        .slice(0, limit ?? 10)
        .map(tag => (
          <div key={tag} className="mb-2">
            <TagBlock tag={tag} size={size} />
          </div>
        ))}
    </div>
  );
}
