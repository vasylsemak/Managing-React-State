import React from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundary from './ErrorBoundary'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from './cartContext'
import App from './App'

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </ErrorBoundary>,
  document.getElementById('root')
)
