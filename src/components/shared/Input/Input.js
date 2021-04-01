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
        <div className='container'>
            <input className='container__input' onChange={handleChange} {...props} id={id}
                   type="text"
                   {...field}
                   {...props} />
            {label ? (
                <label
                    className={`${
                        value.length ? 'container__shrink' : ''
                    }  container__label`}
                >
                    {label}
                </label>
            ) : null}
            {touched[field.name] && errors[field.name] && (
                <span className="container__error-class">
                    {errors[field.name]}
                </span>)}
        </div>
    );
};

export default Input;
