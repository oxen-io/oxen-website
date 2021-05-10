import React, { useState, useRef } from 'react';
// import Chevron from './Chevron';
import { RichBody } from '../components/RichBody';
import classNames from 'classnames';

export function Accordion(props) {
  const { question, answer } = props;
  const [isActive, setActiveState] = useState(false);
  // const [setRotate, setRotateState] = useState('accordion__icon');

  const content = useRef(null);
  function toggleAccordion() {
    setActiveState(!isActive);
    console.log(isActive);
  }

  return (
    <div>
      <button
        className={
          'accordion text-xl tablet:text-2xl  w-full text-left	bg-secondary px-3'
        }
        onClick={toggleAccordion}
      >
        {question}
      </button>
      <div
        ref={content}
        style={{
          maxHeight: '100%',
          display: isActive ? '' : 'none',
        }}
        className={classNames('accordion-content', !isActive && 'invisible')}
      >
        <div className="w-full px-3 pt-1 text-left">
          <RichBody body={answer} />
        </div>
      </div>
    </div>
  );
}
