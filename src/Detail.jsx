import React from 'react'
import Spinner from './Spinner'
import { useParams } from 'react-router-dom'
import UseFetch from './services/UseFetch'

export default function Detail() {
  const { id } = useParams()
  const { data: product, loading, error } = UseFetch(`products/${id}`)

  if (loading) return <Spinner />
  if (error) throw error

  return (
    <div id='detail'>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id='price'>${product.price}</p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  )
}
