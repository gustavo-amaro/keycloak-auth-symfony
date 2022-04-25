import React, { useEffect, useState } from 'react'
import { useAxios } from '../utils/hooks'

// import { Container } from './styles';

interface product {
  description: string
  price: number
}

const Products = () => {
  const api = useAxios('http://localhost:8000/api')
  const [products, setProducts] = useState<Array<product>>([])

  useEffect(() => {
    !!api.current &&
      api.current
        .get('/products')
        .then((response) => {
          const products = response.data
          setProducts(products)
        })
        .catch((err) => console.log(err))
  }, [api])

  return (
    <ul>
      {products.map((product) => (
        <li>{product.description}</li>
      ))}
    </ul>
  )
}

export default Products
