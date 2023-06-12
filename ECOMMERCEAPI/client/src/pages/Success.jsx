import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { clearProduct } from "../redux/productRedux";


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
  const dispatch = useDispatch();

  const { amount, products } = location.state || {};
  const newProducts = products;
  console.log(location.state);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const decrementStockCount = async () => {
      try {
        

        for (let i = 0; i < newProducts.length; i++) {
          const productId = newProducts[i]._id;
          const quantity = newProducts[i].quantity;
    
          const product = await userRequest.get(`/products/${productId}`);
          console.log(productId);
          console.log(product.data.stockCount);
          console.log(quantity);
          const updatedStockCount = product.data.stockCount - quantity;
    
          await userRequest.put(`/products/${productId}`, {
            stockCount: updatedStockCount
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    

    decrementStockCount();
  }, [location.state.cart]);



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
      success
      <InfoContainer>
      </InfoContainer>
      <Link to={"/"}>
        <Button onClick={ () => dispatch(clearProduct( )) }>Go to Homepage</Button>
      </Link>
    </Container>

  );
};

export default Success;