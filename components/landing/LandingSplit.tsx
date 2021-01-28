import { ReactNode } from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export function LandingSplit({ title, subtitle, children }: Props) {
  return (
    <div className="w-6/12">
      {title && (
        <h1 className="font-prompt font-medium text-7xl leading-tight mb-6">
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
