import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {},
    reset: () => {}
})

export default CartContext;