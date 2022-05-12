import React, { useRef } from 'react'
import Spinner from './Spinner'
import PageNotFound from './PageNotFound'
import useFetch from './services/useFetch'
import { useParams, useNavigate } from 'react-router-dom'

export default function Detail({ addToCart }) {
  const { id } = useParams()
  const skuRef = useRef()
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

      <select id='size' ref={skuRef}>
        <option value=''>Size</option>
        {skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>

      <p>
        <button
          onClick={() => {
            const curSku = skuRef.current.value
            if (!curSku) return alert('Select yout size!')
            addToCart(id, curSku)
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
