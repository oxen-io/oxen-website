import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClickAway } from 'react-use';
// import ExitSVG from '../assets/svgs/exit-primary.svg';
import { UI } from '../constants';
import { collapseSearchOverlay } from '../state/navigation';
import { IState } from '../state/reducers';

interface Props {
  modalId: string;
  isOpen: boolean;
  children: ReactNode;
  isMobileFullscreen?: boolean;
  className?: string;
  close?: () => void;
}

export function Modal(props: Props) {
  const { modalId, isOpen, close, className, children } = props;
  const { searchOverlayExpanded, openedModal } = useSelector(
    (state: IState) => state.navigation,
  );

  const dispatch = useDispatch();
  const [shouldRender, setShouldRender] = useState(false);

  const ref = useRef(null);
  useClickAway(ref, close);

  useEffect(() => {
    // If modal is open, close search overlay
    if (isOpen && searchOverlayExpanded) {
      dispatch(collapseSearchOverlay());
    }

    // Refuse to open if another modal is currently open
    if (modalId !== openedModal) {
      console.log(
        `Cannot open modal ${modalId}, ${openedModal} is already open.`,
      );

      setShouldRender(true);
    }
  }, []);

  if (!isOpen || !shouldRender) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{
        zIndex: UI.Z_INDEX_MODAL_OVERLAY,
        paddingLeft: `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
        paddingRight: `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
      }}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25"
    >
      <div
        style={{
          minWidth: '200px',
          maxWidth: '100%',
          minHeight: '150px',
          maxHeight: '80vh',
        }}
        className={classNames(
          'relative border-2 border-gray px-6 pb-4 pt-12 bg-white',
          className,
        )}
      >
        <div className="absolute inset-0 flex justify-end pt-3 pr-3">
          {/* <ExitSVG onClick={close} className="h-8 cursor-pointer" /> */}
        </div>
        {children}
      </div>
    </div>
  );
}
