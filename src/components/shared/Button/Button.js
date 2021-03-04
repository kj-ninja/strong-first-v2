import React from 'react';
import './Button.scss';

const Button = ({ children, ...otherProps }) => {
  return (
    <button className='button effect' {...otherProps}>
      <span className='button__span'>{children}</span>
    </button>
  );
};

export default Button;
