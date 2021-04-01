import React from 'react';
import './Button.scss';

const Button = ({children, effectName, ...otherProps}) => {
    return (
        <button className={`button effect ${effectName ? effectName : ''} `}{...otherProps}>
             <span className='button__span'>
                 {children}
             </span>
        </button>
    );
};

export default Button;
