// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

// @ts-ignore
export default function TextBox({ text, setText }) {
  function onChangeText(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const value = e.target.value;
    setText(value);
  }

  // function onSubmit() {
  //   // placeholder for api request

  //   console.log(text);
  // }

  return (
    <div className='position-relative w-100 h-100 shadow-sm border border-secondary rounded '>
      <textarea
        style={{ outline: 'none' }}
        className='prompt w-100 h-100 bg bg-secondary-subtle p-3'
        placeholder='Instructions'
        value={text}
        onChange={onChangeText}
      ></textarea>
      {/* <div
        style={{ width: '80px' }}
        className='end-0 top-0 bottom-0  position-absolute d-flex align-items-end justify-content-center'
      >
        <div
          className='prompt-send-icon-wrapper bg bg-dark rounded-circle p-4'
          onClick={onSubmit}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            size='lg'
            style={{ color: 'green' }}
          />
        </div>
      </div> */}
    </div>
  );
}
