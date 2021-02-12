import { ReactNode } from 'react';

export function ArticleCallout({ children }: { children: ReactNode }) {
  return (
    <p className="pl-4 mb-8 italic border-l-2 border-opacity-25 border-primary">
      {children}
    </p>
  );
}
