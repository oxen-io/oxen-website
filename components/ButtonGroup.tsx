import classNames from 'classnames';
import React from 'react';

interface Props {
  className?: string;
  children: JSX.Element[];
  equalWidth?: boolean;
}

export function ButtonGroup(props: Props) {
  // Attach props to children following this guide
  // https://stackoverflow.com/a/35102287
  const { className, children, equalWidth } = props;
  const numChildren = children.length;
  const hasChildren = Boolean(numChildren);

  const firstChild = children[0];
  const lastChild = children[numChildren - 1];

  return (
    <div className={classNames('flex', className)}>
      {hasChildren &&
        React.cloneElement(firstChild, {
          className: classNames(
            'rounded-r-none border-r-0',
            equalWidth && 'flex-1',
          ),
        })}
      {numChildren > 2 &&
        children.slice(1, numChildren - 1).map(child =>
          React.cloneElement(child, {
            className: classNames(
              'rounded-r-none rounded-l-none border-r-0',
              equalWidth && 'flex-1',
            ),
          }),
        )}
      {hasChildren &&
        React.cloneElement(lastChild, {
          className: classNames('rounded-l-none', equalWidth && 'flex-1'),
        })}
    </div>
  );
}
