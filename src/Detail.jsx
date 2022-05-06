import React, { useState } from 'react'
import Spinner from './Spinner'
import PageNotFound from './PageNotFound'
import UseFetch from './services/UseFetch'
import { useParams, useNavigate } from 'react-router-dom'

export default function Detail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [sku, setSku] = useState('')
  const { data: product, loading, error } = UseFetch(`products/${id}`)

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
          className='btn btn-primary'
          onClick={() => navigate('/cart')}
          disabled={!sku}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  )
}
