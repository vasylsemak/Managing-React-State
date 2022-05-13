import React, { useState } from 'react'
import Spinner from './Spinner'
import PageNotFound from './PageNotFound'
import useFetch from './services/useFetch'
import { useParams, useNavigate } from 'react-router-dom'

export default function Detail({ dispatch }) {
  const { id } = useParams()
  const [sku, setSku] = useState('')
  const navigate = useNavigate()
  const { data: product, loading, error } = useFetch(`products/${id}`)

  if (loading) return <Spinner />
  if (!product) return <PageNotFound />
  if (error) throw error

  const { name, price, description, skus } = product

  return (
    <div id='detail'>
      <h1>{name}</h1>
      <p>{description}</p>
      <p id='price'>${price}</p>

      <select id='size' value={sku} onChange={(e) => setSku(e.target.value)}>
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
