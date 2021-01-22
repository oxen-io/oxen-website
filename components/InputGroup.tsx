import classNames from 'classnames';
import React from 'react';

interface Props {
  children: JSX.Element[];
  className?: string;
  hasOpenDropdown?: boolean;
}

export function InputGroup(props: Props) {
  // Attach props to children following this guide
  // https://stackoverflow.com/a/35102287
  const { children, className, hasOpenDropdown = false } = props;
  const numChildren = children.length;
  const hasChildren = Boolean(numChildren);

  const firstChild = children[0];
  const lastChild = children[numChildren - 1];

  return (
    <div className={classNames('flex', 'w-full', className)}>
      {hasChildren &&
        React.cloneElement(firstChild, {
          className: classNames(
            'rounded-r-none',
            'border-r-0',
            'duration-300',
            hasOpenDropdown && 'rounded-b-none',
          ),
        })}
      {numChildren > 2 &&
        children.slice(1, numChildren - 1).map(child =>
          React.cloneElement(child, {
            className: classNames(
              'rounded-r-none',
              'border-l-none',
              'duration-300',
              hasOpenDropdown && 'rounded-b-none',
            ),
          }),
        )}
      {hasChildren &&
        React.cloneElement(lastChild, {
          className: classNames(
            'rounded-l-none',
            'duration-300',
            hasOpenDropdown && 'rounded-b-none',
          ),
        })}
    </div>
  );
}
