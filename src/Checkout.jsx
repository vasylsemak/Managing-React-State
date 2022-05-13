import React, { useState } from 'react'
import { saveShippingAddress } from './services/shippingService'
import formErrors from './services/formErrors'

// Form status state using enumaration pattern
const STATUS = {
  IDLE: 'IDLE',
  SUBMITTING: 'SUBMITTING',
  SUBMITTED: 'SUBMITTED',
  COMPLETED: 'COMPLETED',
}

// !!!! Declaring outside component to avoid recreation on each render
const emptyAddress = { city: '', country: '' }
const touchedObj = {}

export default function Checkout({ cart, dispatch }) {
  const [address, setAddress] = useState(emptyAddress)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [saveError, setSaveError] = useState(null)
  const [touched, setTouched] = useState(touchedObj)

  // Derived state
  // Form validation using formErrors f-n
  const errorsObj = formErrors(address)
  const errorsKeys = Object.keys(errorsObj)
  const isValid = errorsKeys.length === 0

  function handleChange(e) {
    e.persist() // presist event - do not garbage collect it
    setAddress((address) => ({
      ...address,
      [e.target.id]: e.target.value,
    }))
  }

  function handleBlur(e) {
    let touchedInput = e.target.id
    setTouched((cur) => ({
      ...cur,
      [touchedInput]: true,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(STATUS.SUBMITTING)
    // if form filled - submit and set status to COMPLETED
    if (isValid) {
      try {
        await saveShippingAddress(address)
        dispatch({ type: 'empty' })
        setStatus(STATUS.COMPLETED)
      } catch (error) {
        setSaveError(error)
      }
    } else {
      /* if form NOT filled properly - set status SUBMITED
        and render errors on screen */
      setStatus(STATUS.SUBMITTED)
    }
  }

  if (saveError) throw saveError
  if (status === STATUS.COMPLETED)
    return <h1>Thank you for shopping with us!</h1>

  return (
    <>
      <h1>Shipping Info</h1>

      {!isValid && status === STATUS.SUBMITTED && (
        <div role='alert'>
          <p>Please fix following errors:</p>
          <ul>
            {errorsKeys.map((errorKey) => (
              <li key={errorKey}>{errorsObj[errorKey]}</li>
            ))}
          </ul>
        </div>
      )}

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
          {/* inline form input evaluation */}
          <p role='alert'>
            {(touched.city || status === STATUS.SUBMITTED) && errorsObj.city}
          </p>
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
          {/* inline form input evaluation */}
          <p role='alert'>
            {(touched.country || status === STATUS.SUBMITTED) &&
              errorsObj.country}
          </p>
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
