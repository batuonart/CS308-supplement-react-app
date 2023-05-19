import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { publicRequest } from "../requestMethod"
import { useState } from "react"
import Product from '../components/Product'

const SearchContainer = styled.div`
    margin-top: 10px;
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
`
const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  
  & > div {
    flex-basis: calc(33.33% - 10px); /* 33.33% is the width of each item, 10px is the space between items */
    margin: 5px; /* margin between items */
  }
`
const Orders = () => {
  return (
    <div> <Navbar/>
    <Announcement/>
       
        sa
    <Newsletter />
    <Footer /></div>
  )
}

export default Orders