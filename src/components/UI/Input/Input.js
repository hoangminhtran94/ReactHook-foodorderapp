import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div
      className={`${classes.input} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.input.id}>{props.label}</label>
      <input type={props.input.type || "text"} {...props.input} ref={ref} />
    </div>
  );
});

export default Input;
