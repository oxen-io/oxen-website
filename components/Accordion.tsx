import React, { useState, useRef } from 'react';
// import Chevron from './Chevron';
import { RichBody } from '../components/RichBody';
import './Accordion.module.scss';

export function Accordion(props) {
  const { question, answer } = props;
  const [isActive, setActiveState] = useState(false);
  // const [setHeight, setHeightState] = useState('0px');
  // const [setRotate, setRotateState] = useState('accordion__icon');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(!isActive);
    // setHeightState(isActive ? '0px' : `${content.current.scrollHeight}px`);
  }

  return (
    <div>
      <button
        className={'text-xl tablet:text-2xl  w-full text-left	bg-secondary px-3'}
        onClick={toggleAccordion}
      >
        {question}
      </button>
      <div
        ref={content}
        // style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
        style={{ display: isActive ? '' : 'hidden' }}
      >
        <RichBody body={answer} />
      </div>
    </div>
  );
}
