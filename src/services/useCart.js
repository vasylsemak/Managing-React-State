import { useState, useEffect } from 'react'

export default function useCart() {
  const [cart, setCart] = useState(() => {
    /* use f-n in useState for:
    1. prevent fetching from localStorage if cart does not change - 
      f-n in useState does expensive loading
    2. catch possible errors while parsing cart
  */
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? []
    } catch (error) {
      console.error('The cart could not be parsed in JSON')
      return []
    }
  })

  // set localStorage every time cart updates
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])

  const addToCart = (id, sku) => {
    setCart((items) => {
      const isInCart = items.find((i) => i.sku === sku)

      if (isInCart)
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        )
      else return [...items, { id, sku, quantity: 1 }]
    })
  }

  const updateQuantity = (sku, quantity) =>
    quantity === 0
      ? setCart((items) => items.filter((i) => i.sku !== sku))
      : setCart((items) =>
          items.map((i) => (i.sku === sku ? { ...i, quantity } : i))
        )

  return { cart, addToCart, updateQuantity }
}
