import React from 'react';
import './Button.scss';

const Button = ({children, effectNumber, ...otherProps}) => {
    return (
        <button className='button effect' {...otherProps}>
             <span className={`${effectNumber ? effectNumber : ''}  button__span`}>
                 {children}
             </span>
        </button>
    );
};

export default Button;
