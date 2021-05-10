import React, { useState, useRef } from 'react';
// import Chevron from './Chevron';
import { RichBody } from '../components/RichBody';
import classNames from 'classnames';
import TriangleSVG from '../assets/svgs/triangle.svg';

export function Accordion(props) {
  const { question, answer } = props;
  const [isActive, setActiveState] = useState(false);

  const content = useRef(null);
  function toggleAccordion() {
    setActiveState(!isActive);
  }

  return (
    <div className="mb-1 border border-current">
      <button
        className={
          'flex accordion text-xl tablet:text-2xl  w-full text-left	bg-secondary px-3 justify-between items-center'
        }
        onClick={toggleAccordion}
      >
        <div style={{ maxWidth: '95%' }}> {question}</div>
        <TriangleSVG
          className={classNames(
            'h-3 fill-current text-primary transform outline-none cursor-pointer',
            isActive ? 'rotate-90' : '',
          )}
        />{' '}
      </button>
      <div
        ref={content}
        style={{
          maxHeight: '100%',
          display: isActive ? '' : 'none',
        }}
        className={classNames('accordion-content')}
      >
        <div className="w-full px-3 pt-1 text-lg text-left tablet:text-xl">
          <RichBody body={answer} />
        </div>
      </div>
    </div>
  );
}
