import classes from "./Checkout.module.css";
import Button from "./../UI/Button/Button";
import Card from "../UI/Card/Card";
import { useEffect } from "react";
import useInput from "../../hooks/use-input";
const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    hasError: nameFieldHasError,
    setEnteredValue: setName,
    inputIsValid: nameInputIsValid,
    onBlurHandler: onNameBlurHandler,
    onChangeHandler: onNameChangeHandler,
  } = useInput((value) => value.length > 0);

  const {
    enteredValue: enteredStreet,
    hasError: streetFieldHasError,
    setEnteredValue: setStreet,
    inputIsValid: streetInputIsValid,
    onBlurHandler: onStreetBlurHandler,
    onChangeHandler: onStreetChangeHandler,
  } = useInput((value) => value.length > 0);

  const {
    enteredValue: enteredPostal,
    hasError: postalFieldHasError,
    setEnteredValue: setPostal,
    inputIsValid: postalInputIsValid,
    onBlurHandler: onPostalBlurHandler,
    onChangeHandler: onPostalChangeHandler,
  } = useInput((value) => value.length > 0);

  const {
    enteredValue: enteredCity,
    hasError: cityFieldHasError,
    setEnteredValue: setCity,
    inputIsValid: cityInputIsValid,
    onBlurHandler: onCityBlurHandler,
    onChangeHandler: onCityChangeHandler,
  } = useInput((value) => value.length > 0);

  let formIsInValid =
    !nameInputIsValid ||
    !streetInputIsValid ||
    !cityInputIsValid ||
    !postalInputIsValid;

  useEffect(() => {
    if (props.checkoutInfo) {
      setName(props.checkoutInfo.name);
      setCity(props.checkoutInfo.city);
      setPostal(props.checkoutInfo.postalCode);
      setStreet(props.checkoutInfo.street);
    }
  }, [props.checkoutInfo]);
  const nameClasses = nameFieldHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const streetClasses = streetFieldHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const postalClasses = postalFieldHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const cityClasses = cityFieldHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const submitButtonClasses = formIsInValid
    ? `${classes.disabled}`
    : `${classes.submit}`;

  const submitOrderHandler = (event) => {
    event.preventDefault();
    if (formIsInValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
  };
  return (
    <Card className={classes.checkout}>
      <form className={classes.form} onSubmit={submitOrderHandler}>
        <div className={nameClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            onBlur={onNameBlurHandler}
            onChange={onNameChangeHandler}
            value={enteredName}
          />
          {nameFieldHasError && <p>Input name is invalid!!</p>}
        </div>
        <div className={streetClasses}>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            onBlur={onStreetBlurHandler}
            onChange={onStreetChangeHandler}
            value={enteredStreet}
          />
          {streetFieldHasError && <p>Street is invalid!!</p>}
        </div>
        <div className={postalClasses}>
          <label htmlFor="postal">Postal code</label>
          <input
            id="postal"
            type="text"
            onBlur={onPostalBlurHandler}
            onChange={onPostalChangeHandler}
            value={enteredPostal}
          />
          {postalFieldHasError && <p>Postal code is invalid!!</p>}
        </div>
        <div className={cityClasses}>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            onBlur={onCityBlurHandler}
            onChange={onCityChangeHandler}
            value={enteredCity}
          />
          {cityFieldHasError && <p>City field is invalid!!</p>}
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={submitButtonClasses}
            isDisabled={formIsInValid}
          >
            Confirm
          </Button>
          <Button onClick={props.onCancel}>Cancel</Button>
        </div>
      </form>
    </Card>
  );
};
export default Checkout;
