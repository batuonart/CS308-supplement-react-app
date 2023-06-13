import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { publicRequest } from "../requestMethod"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
    margin-left: 20px;
    font-size: 30px;
`

const PlainLine = styled.hr`
    margin: 40px;
`

const Button = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
    margin-top: 50px;
    margin-left: 60px;
`
const CancelButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
    &:hover {
    background-color: #e8e8e8;
    cursor: pointer;
  }
`
const Image = styled.img`
    width: 200px;
    height: 200px;
    max-height: 200px;
    object-fit: contain;
`

const Orders = () => {
   const[orders,setOrders] = useState([]);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
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

  const handleCancelOrder = async (orderId) => {
    try {
        setLoading(true);
        const response = await publicRequest.delete(`/orders/${orderId}`);
        setLoading(false);
        window.location.reload(); // Refresh the page

        //dispatch(cancelOrder(orderId)); // Dispatch the action to remove the order from Redux store
        // Handle any additional logic or UI updates upon successful order cancellation
        console.log(response.data);
    } catch (error) {
        setLoading(false);
        // Handle error response
        console.log(error);
    }
};

const handleRefundRequest = async (order, product) => {
  const currentDate = new Date();
  const purchaseDate = order.createdAt;
  const purchaseDateTime = new Date(purchaseDate);
  console.log("click");
  // Check if one month has passed
  if (
    currentDate.getFullYear() > purchaseDateTime.getFullYear() ||
    (currentDate.getFullYear() === purchaseDateTime.getFullYear() &&
      currentDate.getMonth() > purchaseDateTime.getMonth() + 1)
  ) {
    toast.error('Sorry, unable to refund products purchased 30+ days ago.', {
      
    });
    return;
  }
  let refundProduct = {
    productId: product._id,
    quantity: product.quantity,
    productPrc: order.amount,
    buyerId: user._id,
}
await publicRequest.post("/returnls/", refundProduct)

  toast.success('Refund request submitted', {
    toastStyle: { background: 'green' },
    progressStyle: { background: 'green' },
    className: 'custom-toast',
    bodyClassName: 'custom-toast-body',
    progressClassName: 'custom-toast-progress',
  });

  // Handle refund request
  // ...
};

  return (
    <div> <Navbar/>
    <Announcement/>
    <OrderContainer>
    <ToastContainer />

      {orders.length > 0 ? (
        orders.map(order => {
            return <div key={order._id}> 
            <OrderTextContainer>
              <OrderTextInfo style={{ color: "teal" }}>{order.status}</OrderTextInfo>
              <OrderTextInfo style={{ fontWeight: 300 }}>{order.address}</OrderTextInfo>
              <OrderTextInfo style={{ fontWeight: 300 }}>{getFormattedDate(order.createdAt)}</OrderTextInfo>
              <OrderTextInfo>${order.amount}</OrderTextInfo>
              <CancelButton onClick={() => handleCancelOrder(order._id)}>Cancel Order</CancelButton>
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
                      <Button onClick={() => handleRefundRequest(order, product)}>Request Refund</Button>
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