import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Product = ({ id, name, price, image }) => {
  const { category } = useParams()
  return (
    <div className='product'>
      <Link to={`/${category}/${id}`}>
        <img src={`/images/${image}`} alt={name} />
        <h3>{name}</h3>
        <p>${price}</p>
      </Link>
    </div>
  )
}

export default Product
