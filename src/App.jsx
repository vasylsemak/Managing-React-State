import './App.css'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Products from './Products'

export default function App() {
  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <Products />
        </main>
      </div>
      <Footer />
    </>
  )
}
