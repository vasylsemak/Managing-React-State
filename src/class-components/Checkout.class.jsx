import React, { Component } from 'react'
import { saveShippingAddress } from '../services/shippingService'
import formErrors from '../services/formErrors'

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

export default class Checkout extends Component {
  state = {
    address: emptyAddress,
    status: STATUS.IDLE,
    saveError: null,
    touched: touchedObj,
  }

  // Derived state
  // Form validation using formErrors f-n
  isItValid() {
    const errorsObj = formErrors(this.state.address)
    const errorsKeys = Object.keys(errorsObj)
    const isValid = errorsKeys.length === 0

    return { isValid, errorsKeys, errorsObj }
  }

  handleChange = (e) => {
    e.persist() // presist event - do not garbage collect it
    this.setState((state) => ({
      address: {
        ...state.address,
        [e.target.id]: e.target.value,
      },
    }))
  }

  handleBlur = (e) => {
    let touchedInput = e.target.id
    this.setState((state) => ({
      touched: {
        ...state.touched,
        [touchedInput]: true,
      },
    }))
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({ status: STATUS.SUBMITTING })

    // if form filled - submit and set status to COMPLETED
    const { isValid } = this.isItValid()
    if (isValid) {
      try {
        await saveShippingAddress(this.state.address)
        this.props.dispatch({ type: 'empty' })
        this.setState({ status: STATUS.COMPLETED })
      } catch (error) {
        this.setState({ saveError: error })
      }
    } else {
      /* if form NOT filled properly - set status SUBMITED
        and render errors on screen */
      this.setState({ status: STATUS.SUBMITTED })
    }
  }

  render() {
    const { address, status, saveError, touched } = this.state
    const { isValid, errorsKeys, errorsObj } = this.isItValid()

    if (saveError) throw saveError
    if (status === STATUS.COMPLETED) {
      return <h1>Thank you for shopping with us!</h1>
    }

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

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='city'>City</label>
            <br />
            <input
              id='city'
              type='text'
              value={address.city}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
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
              onBlur={this.handleBlur}
              onChange={this.handleChange}
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
}
