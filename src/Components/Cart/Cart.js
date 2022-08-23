import classes from "./Cart.module.css";
import { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  var cartHasItems = false;
  if (ctx.items.length > 0) {
    cartHasItems = true;
  }
  const cartItemAddHandler = (item) => {
    ctx.addItem(item);
  }

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  }
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
            onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1})}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {cartHasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
