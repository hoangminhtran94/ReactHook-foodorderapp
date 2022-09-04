import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (
        state.items.find((item) => {
          return item.name === action.payload.name;
        })
      ) {
        const existedItem = state.items.find((item) => {
          return item.name === action.payload.name;
        });
        const index = state.items.indexOf(existedItem);
        const existedAmount = existedItem.amount;
        const updatedExistedItem = {
          ...existedItem,
          amount: existedAmount + action.payload.amount,
        };
        const updatedItems = [...state.items];
        updatedItems[index] = updatedExistedItem;
        const updatedTotalAmount =
          state.totalAmount + action.payload.price * action.payload.amount;
        return {
          ...state,
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      } else {
        const updatedItems = state.items.concat(action.payload);
        const updatedTotalAmount =
          state.totalAmount + action.payload.price * action.payload.amount;
        return {
          ...state,
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }
    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        updatedItems = [...state.items];
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "INCREASEAMOUNT": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount + existingItem.price;
      let updatedItems = [...state.items];
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", payload: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", payload: id });
  };

  const increaseAmountHandler = (id) => {
    dispatchCartAction({ type: "INCREASEAMOUNT", payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    increaseAmount: increaseAmountHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
