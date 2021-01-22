import { IAuthor } from '../../../types/article';
// import { Avatar } from '../../Avatar';

interface Props {
  author: IAuthor;
  date: string;
}

export function ArticleWidgetAuthor({ author, date }: Props) {
  return (
    <div className="flex items-center space-x-3">
      {/* <Avatar size={10} imageSrc={author?.imageSrc} /> */}

      <div className="flex flex-col leading-tight">
        <span className="font-roboto tracking-wider text-sm font-bold">
          By: {author.name}
        </span>
        <span>{date}</span>
      </div>
    </div>
  );
}
