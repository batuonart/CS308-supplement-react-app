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
import { Link } from 'react-router-dom';

const OrderContainer = styled.div`
    margin-left: 0px;
`; 
const OrderTextContainer = styled.div`
    margin-left: 30px;
    display: flex;
    flex-direction: column;
`; 
const OrderTextInfo = styled.div`
    font-weight: 700;
    margin-left: 5px;
    font-size: 30px;
`

const ProductContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
  
`
const ProductDeatils = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const PlainLine = styled.hr`
    margin: 30px;
    color: teal;
`


const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: contain;
`

const Orders = () => {
   const[orders,setOrders] = useState([]);
   const user = useSelector( state => state.user.currentUser );
   const id = user._id;

   
   useEffect(() => {
       const getOrders = async () => {
           try {
               const orderData = await publicRequest.get("/orders/find/" + id)
               setOrders(orderData.data)
           } catch (error) {  
            console.debug("error")
           }
       };
       getOrders()
   }, [id])

  const getFormattedDate = (dateString) => {
    const createdAtDate = new Date(dateString).toISOString().split('T')[0];
    return createdAtDate;
  };

  return (
    <div> <Navbar/>
    <Announcement/>
    <OrderContainer>
      {orders.length > 0 ? (
        orders.map(order => {
            return <div key={order._id}> 
            <OrderTextContainer>
              
              <OrderTextInfo></OrderTextInfo>
              <OrderTextInfo style={{ color: "teal" }}>{order.status}</OrderTextInfo>
              <OrderTextInfo style={{ fontWeight: 300 }}>{order.address}</OrderTextInfo>
              <OrderTextInfo style={{ fontWeight: 300 }}>{getFormattedDate(order.createdAt)}</OrderTextInfo>
            </OrderTextContainer>      
            <ProductContainer>
              {order.products.length > 0 ? (
                order.products.map(product => {
                  return <div key ={product._id}>
                    <ProductDeatils>
                      <Link to={`/product/${product.productId}`}>
                        <Image src = {product.productImg}/>
                      </Link>
                      <h1>{product.productTitle}</h1>
                      <h1>x{product.quantity}</h1>
                    </ProductDeatils>
                  </div>
                })
              ):(<div>NO PRODUCTS</div>)}
                
              
            </ProductContainer>
            <PlainLine/>

            </div>
        })
    ):(<h1>{orders.length}</h1>)}  
    </OrderContainer>
    
    <Newsletter />
    <Footer />
    </div>
  )
}

export default Orders