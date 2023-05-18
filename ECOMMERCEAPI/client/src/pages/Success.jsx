import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethod";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const InfoContainer = styled.div`

  border: 1px solid gainsboro;
  border-radius: 5px;
  background-color: black;
  height: 20%;
  width: 50%;
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
    margin-top: 5px;
    border-radius: 5px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 600;

    &:hover {
      background-color: silver;
      cursor: pointer;
    }
`

const Success = () => {

  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  console.log( orderId );
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch { }
    };
    createOrder();
  }, [cart, data, currentUser]);

  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}

      <InfoContainer>
      </InfoContainer>
      <Link to={"/"}>
        <Button>Go to Homepage</Button>
      </Link>
    </Container>

  );
};

export default Success;