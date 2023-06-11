import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { clearProduct } from "../redux/productRedux";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { keyframes } from 'styled-components';

const fadeInOutAnimation = keyframes`
    0% {
        background-color: transparent;
    }
    50% {
        background-color: #ffaa00;
    }
    100% {
        background-color: transparent;
    }
`;


const Container = styled.div`
  

`


const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeInOutAnimation} 4s ease-in-out infinite;

`
const SuccessPart = styled.div `
  display: flex;
  font-weight: bold;
  color: #fcf5f5;
  background-color: teal;
  font-size: 38px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 30px;
  border: 2px #0adeff;
`
const InfoContainer = styled.div`

  border: 1px solid gainsboro;
  border-radius: 5px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  &:hover::after{
    content: 'BACKEND ISTIFA !!!';
    font-size: 2.5rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
  }

`

const Button = styled.button`
    color: black;
    padding: 15px;
    margin-top: 20px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      background-color: teal;
      color: white;
      cursor: pointer;
    }
`

const Success = () => {

  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const dispatch = useDispatch();

  const { amount, products } = location.state || {};
  const newProducts = products;
  console.log(location.state);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        console.log(newProducts);
        const res = await userRequest.post("/orders/", {
          userId: currentUser._id,
          products: newProducts.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            productTitle: item.title,
            productImg: item.img
          })),
          amount: amount,
          address: currentUser.address
        });
      } catch (error){ 
        console.error(error);
      }
    };
    createOrder();
  }, [newProducts, products,amount, currentUser]);

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <SuccessPart>You have succesfully bought the products!</SuccessPart>
      </Wrapper>
      <Newsletter/>
      <Footer/>
    </Container>

  );
};

export default Success;