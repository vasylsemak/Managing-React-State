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

  console.log('cart: ', cart)

  function addToCart(id, sku) {
    setCart((items) => {
      const isInCart = items.find((i) => i.sku === sku)

      // if item is in cart, increase quantity by 1
      if (isInCart)
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        )
      // if no item - new item to the cart
      else return [...items, { id, sku, quantity: 1 }]
    })
  }

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
            <Route path='/cart' element={<Cart />} />
            <Route path='/' element={<h1>Welcome to Curved Rock Fitness</h1>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}
