import React, { useState } from 'react'
import Spinner from './Spinner'
import Product from './Product'
import PageNotFound from './PageNotFound'
import UseFetch from './services/UseFetch'
import { useParams } from 'react-router-dom'

export default function Products() {
  const { category } = useParams()
  const [size, setSize] = useState('')

  const {
    data: products,
    error,
    loading,
  } = UseFetch('products?category=' + category)

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((sku) => sku.size === parseInt(size)))
    : products

  if (loading) return <Spinner />
  if (products.length === 0) return <PageNotFound />
  if (error) throw error

  return (
    <>
      <section id='filters'>
        <label htmlFor='size'>Filter by Size:</label>{' '}
        <select
          id='size'
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value=''>All sizes</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id='products'>
        {filteredProducts.map((p) => (
          <Product key={p.id} {...p} />
        ))}
      </section>
    </>
  )
}
