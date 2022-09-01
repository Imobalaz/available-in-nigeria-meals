import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const [formIsOpen, setFormIsOpen] = useState(false);
  var cartHasItems = false;
  if (ctx.items.length > 0) {
    cartHasItems = true;
  }
  const cartItemAddHandler = (item) => {
    ctx.addItem(item);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://post-http-request-6476f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setHasSubmitted(true);
    ctx.reset();
  };

  const orderHandler = () => {
    setFormIsOpen(true);
  };

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1 })}
          />
        );
      })}
    </ul>
  );

  const formActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {cartHasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {formIsOpen && (
        <Checkout onOrder={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!formIsOpen && formActions}
    </>
  );

  const isSubmittingModalContent = <div>Sending order data...</div>;

  const hasSubmittedModalContent = (
    <>
      <div>Successfully sent your order</div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return <Modal onClose={props.onHideCart}>
  {!isSubmitting && !hasSubmitted && cartModalContent}
  {isSubmitting && isSubmittingModalContent}
  {hasSubmitted && hasSubmittedModalContent}
  </Modal>;
};

export default Cart;
