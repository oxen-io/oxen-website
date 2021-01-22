import classNames from 'classnames';
import React, { useRef } from 'react';
import { useClickAway } from 'react-use';

interface Props {
  isOpen: boolean;
  pull?: 'left' | 'right' | 'center';
  style?: 'default' | 'outline';
  onClickAway: () => void;
  center?: boolean;

  offsetX?: number;
  offsetY?: number;

  // Use DropdownItem
  children?: JSX.Element | JSX.Element[];
}

export function Dropdown(props: Props) {
  // Ensure children are all DropdownItems
  const {
    isOpen,
    pull = 'right',
    style = 'default',
    center = false,
    offsetX,
    offsetY,
    onClickAway,
    children,
  } = props;

  const ref = useRef(null);
  useClickAway(ref, onClickAway);

  return (
    <div className="relative w-full h-0 z-50">
      <div
        style={{
          width: 'max-content',
          marginLeft: offsetX ? `${offsetX}px` : 'unset',
          marginTop: offsetY ? `${offsetY}px` : '0.5rem',
        }}
        className={classNames(
          'absolute',
          'top-0',
          'z-50',
          isOpen ? 'block' : 'hidden',
          pull === 'right' && 'left-0',
          pull === 'left' && 'right-0',
          pull === 'center' && 'left-0 right-0',
        )}
      >
        <div
          ref={ref}
          className={classNames(
            'bg-white',
            'duration-300',
            'rounded-lg',
            'transform',
            'shadow-lg',
            'overflow-hidden',
            'children:last:border-b-0',
            style === 'default' && ['pt-2'],
            style === 'outline' && ['py-2', 'border-2', 'border-secondary'],
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
