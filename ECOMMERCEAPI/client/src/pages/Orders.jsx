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
    justify-content: space-around;
    margin-left: 30px;
    display: flex;
`; 
const OrderTextInfo = styled.div`
    font-weight: 700;
    margin-left: 5px;
    font-size: 30px;
`

const ProductContainer = styled.div`
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
  
`
const ProductContainerSingle = styled.div`
    
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const ProductText = styled.div`
    
    font-weight: 700;
    margin-top: 50px;
    font-size: 30px;
`

const PlainLine = styled.hr`
    margin: 40px;
`

const Image = styled.img`
    width: 200px;
    height: 200px;
    max-height: 200px;
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
    const createdAtDate = new Date(dateString);
    
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    //sa
    const formattedDate = createdAtDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  return (
    <div> <Navbar/>
    <Announcement/>
    <OrderContainer>
      {orders.length > 0 ? (
        orders.map(order => {
            return <div key={order._id}> 
            <OrderTextContainer>
              <OrderTextInfo style={{ color: "teal" }}>{order.status}</OrderTextInfo>
              <OrderTextInfo style={{ fontWeight: 300 }}>{order.address}</OrderTextInfo>
              <OrderTextInfo style={{ fontWeight: 300 }}>{getFormattedDate(order.createdAt)}</OrderTextInfo>
              <OrderTextInfo>${order.amount}</OrderTextInfo>
            </OrderTextContainer>      
            <ProductContainer>
              {order.products.length > 0 ? (
                order.products.map(product => {
                  return <div key ={product.productId}>
                    <ProductContainerSingle>
                      <Link to={`/product/${product.productId}`}>
                        <Image src = {product.productImg}/>
                      </Link>
                      <ProductText>{product.productTitle}</ProductText>
                      <ProductText style={{ fontWeight: 300, marginLeft: "10px" }}>x {product.quantity}</ProductText>
                    </ProductContainerSingle>
                  </div>
                })
              ):(<div>-</div>)}
                
              
            </ProductContainer>
            <PlainLine/>

            </div>
        })
    ):(<h1>No orders yet!</h1>)}  
    </OrderContainer>
    
    <Newsletter />
    <Footer />
    </div>
  )
}

export default Orders