import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Products from './Products'
import Detail from './Detail'
import Cart from './Cart'
import Checkout from './Checkout'
import useCart from './services/useCart'

export default function App() {
  const { cart, addToCart, updateQuantity } = useCart()

  console.log('cart: ', cart)

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
            <Route path='/checkout' element={<Checkout cart={cart} />} />
            <Route path='/' element={<h1>Welcome to Curved Rock Fitness</h1>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}
