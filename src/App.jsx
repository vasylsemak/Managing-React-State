import './App.css'
import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Products from './Products'
import Detail from './Detail'
import Cart from './Cart'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  const [cart, setCart] = useState([])

  function addToCart(id, sku) {
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

  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <Routes>
            <Route path='/:category' element={<Products />} />
            <Route
              path='/:category/:id'
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path='/cart'
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route path='/' element={<h1>Welcome to Curved Rock Fitness</h1>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}
