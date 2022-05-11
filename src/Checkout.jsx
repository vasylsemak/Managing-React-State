import React, { useState } from 'react'
import { saveShippingAddress } from './services/shippingService'

// Form status state using enumaration pattern
const STATUS = {
  IDLE: 'IDLE',
  SUBMITTING: 'SUBMITTING',
  SUBMITED: 'SUBMITED',
  COMPLETED: 'COMPLETED',
}

// !!!! Declaring outside component to avoid recreation on each render
const emptyAddress = { city: '', country: '' }

export default function Checkout({ cart, clearCart }) {
  const [address, setAddress] = useState(emptyAddress)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [saveError, setSaveError] = useState(null)

  function handleChange(e) {
    e.persist() // presist event - do not garbage collect it
    setAddress((address) => ({
      ...address,
      [e.target.id]: e.target.value,
    }))
  }

  function handleBlur(event) {
    // TODO
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus(STATUS.SUBMITTING)

    /*  1. async call to API
        2. clear cart
        3. update status to completed
    */
    try {
      await saveShippingAddress(address)
      clearCart()
      setStatus(STATUS.COMPLETED)
    } catch (error) {
      setSaveError(error)
    }
  }

  if (saveError) throw saveError
  if (status === STATUS.COMPLETED)
    return <h1>Thank you for shopping with us!</h1>

  return (
    <>
      <h1>Shipping Info</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='city'>City</label>
          <br />
          <input
            id='city'
            type='text'
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor='country'>Country</label>
          <br />
          <select
            id='country'
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value=''>Select Country</option>
            <option value='China'>China</option>
            <option value='India'>India</option>
            <option value='United Kingdom'>United Kingdom</option>
            <option value='USA'>USA</option>
          </select>
        </div>

        <div>
          <input
            type='submit'
            className='btn btn-primary'
            value='Save Shipping Info'
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  )
}
