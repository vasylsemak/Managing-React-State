import React, { useContext } from 'react'
import useCart from './services/useCart'

const CartContext = React.createContext(null)

export function CartProvider(props) {
  const { cart, dispatch } = useCart()

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  return context
}
