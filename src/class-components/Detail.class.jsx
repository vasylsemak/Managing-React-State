import React, { Component } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import PageNotFound from '../PageNotFound'
import useFetch from '../services/useFetch'
import { useCartContext } from '../cartContext'

export default function DetailWrapper() {
  const { id } = useParams()
  const { dispatch } = useCartContext()
  const navigate = useNavigate()
  const fetchResp = useFetch(`products/${id}`)
  const propsObj = { id, dispatch, navigate, fetchResp }

  return <Detail {...propsObj} />
}

class Detail extends Component {
  state = {
    sku: '',
  }

  render() {
    const { sku } = this.state
    const { id, dispatch, navigate, fetchResp } = this.props
    const { data: product, loading, error } = fetchResp

    if (loading) return <Spinner />
    if (!product) return <PageNotFound />
    if (error) throw error

    const { name, price, description, skus } = product

    return (
      <div id='detail'>
        <h1>{name}</h1>
        <p>{description}</p>
        <p id='price'>${price}</p>

        <select
          id='size'
          value={sku}
          onChange={(e) => this.setState({ sku: e.target.value })}
        >
          <option value=''>Size</option>
          {skus.map((s) => (
            <option key={s.sku} value={s.sku}>
              {s.size}
            </option>
          ))}
        </select>

        <p>
          <button
            disabled={!sku}
            onClick={() => {
              dispatch({ type: 'add', id, sku })
              navigate('/cart')
            }}
            className='btn btn-primary'
          >
            Add to cart
          </button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
      </div>
    )
  }
}
