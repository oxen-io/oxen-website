import React, { useState, useRef } from 'react';
import { RichBody } from '../components/RichBody';
import classNames from 'classnames';
import TriangleSVG from '../assets/svgs/triangle.svg';

export function Accordion(props) {
  const { question, answer } = props;
  const [isActive, setActiveState] = useState(false);
  const [height, setHeight] = useState('0px');

  const content = useRef(null);
  function toggleAccordion() {
    setActiveState(!isActive);
    setHeight(isActive ? '0px' : `${content.current.scrollHeight}px`);
  }

  return (
    <div className="mb-1 border border-current rounded-sm">
      <button
        className={classNames(
          'flex accordion text-xl tablet:text-2xl w-full text-left justify-between items-center hover:bg-secondary cursor-pointer py-3 px-6',
          isActive ? 'bg-secondary' : '',
        )}
        onClick={toggleAccordion}
      >
        <div style={{ maxWidth: '90%' }}>{question}</div>
        <TriangleSVG
          className={classNames(
            'h-3 fill-current text-primary transform outline-none cursor-pointer duration-200',
            isActive ? 'rotate-90' : '',
          )}
        />{' '}
      </button>
      <div
        ref={content}
        style={{
          maxHeight: height,
        }}
        className={classNames('accordion-content overflow-hidden')}
      >
        <div className="w-full px-4 pt-4 text-lg text-left ease-in-out tablet:text-xl">
          <RichBody body={answer} />
        </div>
      </div>
    </div>
  );
}
