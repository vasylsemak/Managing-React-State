import { useEffect, useReducer } from 'react'
import cartReducer from '../cartReducer'

// fetch cart from localStorage
let cartFetched
try {
  cartFetched = JSON.parse(localStorage.getItem('cart')) ?? []
} catch (error) {
  console.error('The cart could not be parsed in JSON')
  cartFetched = []
}

export default function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, cartFetched)

  // set localStorage every time cart updates
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])

  return { cart, dispatch }
}
