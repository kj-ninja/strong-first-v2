import React from 'react';
import './Input.scss';

const Input = ({
                   field,
                   label,
                   name,
                   id,
                   value,
                   handleChange,
                   form: {touched, errors},
                   ...props
               }) => {
    return (
        <div className='input-container'>
            <input className='input-container__custom-input' onChange={handleChange} {...props} id={id}
                   type="text"
                   {...field}
                   {...props} />
            {label ? (
                <label
                    className={`${
                        value.length ? 'input-container__shrink' : ''
                    }  input-container__label`}
                >
                    {label}
                </label>
            ) : null}
            {touched[field.name] && errors[field.name] && (
                <span className="input-container__error">
                    {errors[field.name]}
                </span>)}
        </div>
    );
};

export default Input;
