import classNames from 'classnames';
interface Props {
  level: 1 | 2 | 3 | 4;
  small?: boolean;
  bold?: boolean;
  soft?: boolean;
  disabled?: boolean;
  margin?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Title(props: Props) {
  const {
    level,
    children,
    className = '',
    bold = false,
    small = false,
    soft = false,
    disabled = false,
    margin = true,
  } = props;

  const opacity = disabled ? 'opacity-25' : soft ? 'opacity-75' : undefined;

  const commonClassNames = classNames(
    disabled && 'select-none',
    margin && 'mb-2',
    opacity,
    className,
  );

  return (
    <>
      {level === 1 && (
        <h1
          className={classNames(
            'font-raleway',
            small ? 'text-xl' : 'text-twoxl',
            bold ? 'font-bold' : 'font-semibold',
            commonClassNames,
          )}
        >
          {children}
        </h1>
      )}
      {level === 2 && (
        <h2
          className={classNames(
            'font-raleway',
            small ? 'text-lg' : 'text-xl',
            bold ? 'font-bold' : 'font-light',
            commonClassNames,
          )}
        >
          {children}
        </h2>
      )}
      {level === 3 && (
        <h3
          className={classNames(
            'font-raleway',
            small ? 'text-base' : 'text-lg',
            bold ? 'font-bold' : 'font-light',
            commonClassNames,
          )}
        >
          {children}
        </h3>
      )}
      {level === 4 && (
        <h4
          className={classNames(
            'font-raleway',
            small ? 'text-sm' : 'text-base',
            bold ? 'font-bold' : 'font-light',
            commonClassNames,
          )}
        >
          {children}
        </h4>
      )}
    </>
  );
}
