import React, {useRef, useImperativeHandle} from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef(
  ({id, type, label, value, changeHandler, blurHandler, isValid}, ref) => {
    const inputRef = useRef();
    const activate = () => inputRef.current.focus();
    useImperativeHandle(ref, () => ({focus: activate}));
    return (
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          ref={inputRef}
        />
      </div>
    );
  }
);

export default Input;
