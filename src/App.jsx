import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Products from './Products'
import Detail from './Detail'
import Cart from './Cart'
import Checkout from './Checkout'

export default function App() {
  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <Routes>
            <Route path='/:category' element={<Products />} />
            <Route path='/:category/:id' element={<Detail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/' element={<h1>Welcome to Curved Rock Fitness</h1>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}
