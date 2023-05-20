import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { publicRequest } from "../requestMethod"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from 'react-redux'

const OrderContainer = styled.div`
    margin-left: 20px;
`; 
const OrderTextContainer = styled.div`
    margin-left: 30px;
    display: flex;
    flex-direction: row;
`; 
const OrderStatus = styled.div`
    font-weight: 700;
    margin-left: 5px;
    font-size: 30px;
    color:teal;
`

const OrderaAdress = styled.div`
    margin-top: 10px;
    font-weight: 500;
`

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  
  & > div {
    flex-basis: calc(33.33% - 10px); /* 33.33% is the width of each item, 10px is the space between items */
    margin: 5px; /* margin between items */
  }
`


const PlainLine = styled.hr`
    margin: 30px;
`

const Orders = () => {
   const[orders,setOrders] = useState([]);
   const user = useSelector( state => state.user.currentUser );
   const id = user._id;
   
   useEffect(() => {
       const getOrders = async () => {
           try {
               const orderData = await publicRequest.get("/orders/")
               console.debug("found")
               setOrders(orderData.data)
           } catch (error) {  
            console.debug("error")
           }
       };
       getOrders()
   })
   //ADD "}, [id])" INSTED OF TOP

  return (
    <div> <Navbar/>
    <Announcement/>
    <OrderContainer>
      {orders.length > 0 ? (
        orders.map(order => {
            return <div key={order._id}> 
            <OrderTextContainer>
              <OrderStatus style={{color: "black"}}>Status: </OrderStatus>
              <OrderStatus>{order.satus}</OrderStatus>
            </OrderTextContainer>      
            <ProductContainer>
              {order.products.length > 0 ? (
                order.products.map(product => {
                  return <div key ={product._id}>
                    <h1>{product._id}</h1>
                  </div>
                })
              ):(<div>NO PRODUCTS</div>)}
                
              
            </ProductContainer>
            <PlainLine/>

            </div>
        })
    ):(<div>No orders yet.</div>)}  
    </OrderContainer>
    
    <Newsletter />
    <Footer />
    </div>
  )
}

export default Orders