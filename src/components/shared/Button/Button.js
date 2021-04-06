import React from 'react';
import './Button.scss';

const Button = ({children, buttonClass, ...otherProps}) => {
    return (
        <button className={`custom-button ${buttonClass ? buttonClass : ''} `}{...otherProps}>
             <span className='custom-button__text'>
                 {children}
             </span>
        </button>
    );
};

export default Button;
