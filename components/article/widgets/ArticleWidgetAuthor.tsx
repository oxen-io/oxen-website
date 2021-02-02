import React from 'react';
import { IAuthor } from '../../../types/blog';
import { Avatar } from '../../Avatar';

interface Props {
  author: IAuthor;
  publishedDate: string;
}

export function ArticleWidgetAuthor({ author, publishedDate }: Props) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar size={10} imageSrc={author?.avatar.imageUrl} />

      <div className="flex flex-col leading-tight">
        <span className="font-roboto tracking-wider text-sm font-bold">
          By: {author?.name}
        </span>
        <span>{publishedDate}</span>
      </div>
    </div>
  );
}
