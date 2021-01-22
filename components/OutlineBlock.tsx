import classNames from 'classnames';

interface Props {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  theme?: 'default' | 'alt';
  bold?: boolean;
  children: string;
  className?: string;
  onClick?(): void;
}

export function OutlineBlock(props: Props) {
  const {
    children,
    size = 'medium',
    theme = 'default',
    bold,
    className,
    onClick,
  } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(
        theme === 'alt' && 'border-2 border-white rounded-md',
        theme === 'default' && 'border-2 border-secondary rounded-lg',
        size === 'tiny' && 'px-2 text-xs',
        size === 'small' && 'py-1 px-3 text-sm',
        size === 'medium' && 'py-2 px-3',
        size === 'large' && 'py-3 px-3 text-lg',
        onClick && 'cursor-pointer',
      )}
    >
      <span
        className={classNames('text-primary', bold && 'font-medium', className)}
      >
        {children}
      </span>
    </div>
  );
}
