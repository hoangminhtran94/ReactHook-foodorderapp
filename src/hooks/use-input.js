import { useState } from "react";
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validateValue(enteredValue);
  const hasError = !inputIsValid && isTouched;

  const onChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isTouched,
    inputIsValid,
    hasError,
    onBlurHandler,
    onChangeHandler,
    reset,
    setEnteredValue,
  };
};

export default useInput;
