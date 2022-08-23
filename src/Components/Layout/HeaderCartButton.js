import classes from "./HeaderCartButton.module.css"
import CartIcon from "../Cart/CartIcon"
import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
  const [cartIsAdded, setCartIsAdded] = useState(false);

  const ctx = useContext(CartContext);

  
  const styles = `${classes.button}  ${cartIsAdded ? classes.bump : ''}`
  
  const {items} = ctx;


  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setCartIsAdded(true);

    const timer = setTimeout(() => {
      setCartIsAdded(false);
    }, 300);

    return () =>  clearTimeout(timer);
  }, [items]);



    return (
      <button className={styles} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    );
}

export default HeaderCartButton