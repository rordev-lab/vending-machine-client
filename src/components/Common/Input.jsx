import React from 'react';

const Input = (props) => {
  const {
    type,
    name,
    value,
    label,
    onChange,
    placeholder,
    valid,
    invalidMessage,
    readOnly = false,
    nonValid = false,
  } = props;
  let className = 'form-control';
  if (value !== '') {
    if (valid) {
      className = 'form-control is-valid';
    } else {
      className = 'form-control is-invalid';
    }
  }

  if (nonValid) {
    className = 'form-control';
  }

  return (
    <div className='form-group'>
      <label className='form-control-label' htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className={className}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      {value !== '' && !valid && (
        <div className='form-control-feedback'>{invalidMessage}</div>
      )}
    </div>
  );
};

export default Input;
