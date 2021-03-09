import React from 'react';
import './Input.scss';

const Input = ({label, handleChange, ...otherProps }) => {
    return (
        <div className='container'>
            <input className='container__input' onChange={handleChange} {...otherProps} />
            {label ? (
                <label
                    className={`${
                        otherProps.value.length ? 'container__shrink' : ''
                    }  container__label`}
                >
                    {label}
                </label>
            ) : null}
        </div>
    );
};

export default Input;
