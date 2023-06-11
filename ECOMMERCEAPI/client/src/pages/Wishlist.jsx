import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../redux/productRedux';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const WishlistItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 300;
`;

const ItemDescription = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 300;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  font-weight: 300;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
  border: 2px solid ${ props => ( props.remove ? 'red' : 'teal')};
  color: black;
  cursor: pointer;

  &:hover {

    background-color: ${ props => ( props.remove ? 'red' : 'teal')};
    color: white;
  }
`;
 

const Wishlist = () => {

  const user = useSelector( state => state.user.currentUser );
  const userWishlist = user.wishlist;
  const dispatch = useDispatch();

  console.log(user);
  console.log(userWishlist);

  return (
    <><Navbar /><Announcement /><Container>
      <Title>My Wishlist</Title>
      {userWishlist.map(item => (
        <WishlistItem key={item._id}>
          <ItemImage src={item.img} alt={item.name} />
          <ItemInfo>
            <ItemName><strong>Title:</strong> {item.title}</ItemName>
            <ItemDescription><strong>Description:</strong> {item.desc}</ItemDescription>
            <ItemPrice><strong>Price:</strong> {item.price}$</ItemPrice>
            <ButtonContainer>
                <Button >Add to Cart</Button>
                <Button remove onClick={() => dispatch( removeFromWishlist(item))} >
                  Remove from Wishlist
                </Button>
              </ButtonContainer>
          </ItemInfo>
        </WishlistItem>
      ))}
    </Container></>
  );
};

export default Wishlist;
