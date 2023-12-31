import React from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './Product'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products");
        setProducts(res.data)
      } catch (err) {

      }
    };
    getProducts()
  }, [cat]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
          // console.log( "AROMA - ITEM.KEY = ", value, item[ key ]);
          // console.log( "Printing İTEM.KEY.0 => ", item[key][0],  item[key][0].includes(value) )
          // if ( item[key].includes( value) ||  item[key][0].includes(value)) {
          //   console.log( "AROMA HAS FOUND!!!")
          // }
          // else {
          //   console.log( "AROMA NOT FOUND!!!" )
          // }
          return item[key].includes(value) || item[key][0].includes(value);
        })
      )
    );
  }, [products, cat, filters]);
  
  useEffect( () => {
    if (sort === "newest") {
      setFilteredProducts( prev => 
        [...prev].sort( (a,b) => a.createdAt - b.createdAt )
        );
    }
    else if ( sort === "asc") {
      setFilteredProducts( prev => 
        [...prev].sort( (a,b) => a.price - b.price)
        );
    }
    else {
      setFilteredProducts( prev => 
        [...prev].sort( (a,b) => b.price - a.price)
        );
    }
  }, [sort]);


  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <React.Fragment key= {item._id}>
        <Product item={item} />
        </React.Fragment>
      )) : products.slice(0, 32).map((item) => (
        <React.Fragment key= {item._id}>
        <Product item={item} />
        </React.Fragment>
      ))}
    </Container>
  )
}

export default Products
