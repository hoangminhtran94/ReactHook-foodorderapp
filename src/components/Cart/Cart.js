import classes from "./Cart.module.css";
import Button from "./../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CartContext from "../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const [ordering, setOrdering] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState(null);

  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItem = cartContext.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = (id) => {
    cartContext.increaseAmount(id);
  };
  const orderHandler = () => {
    setOrdering(true);
  };
  const cancelHandler = () => {
    setOrdering(false);
  };
  const confirmHandler = (checkoutInfo) => {
    setOrdering(false);
    setCheckoutInfo(checkoutInfo);
  };

  const submitOrderHandler = () => {
    // sendRequest({url:})
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onCancel={props.onCancel}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {ordering && (
        <Checkout
          onConfirm={confirmHandler}
          onCancel={cancelHandler}
          checkoutInfo={checkoutInfo}
        />
      )}
      {!ordering && (
        <div className={classes.actions}>
          <Button className={classes["button--alt"]} onClick={props.onCancel}>
            Close
          </Button>
          {hasItem && (
            <Button className={classes.button} onClick={orderHandler}>
              {checkoutInfo ? "Update info" : "Order"}
            </Button>
          )}
          {hasItem && checkoutInfo && (
            <Button className={classes.button} onClick={submitOrderHandler}>
              Order Now!!
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
};
export default Cart;
