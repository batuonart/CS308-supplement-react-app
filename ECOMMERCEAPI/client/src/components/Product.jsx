import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useState } from "react"
import { useEffect } from "react"
import { publicRequest } from "../requestMethod"
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../redux/productRedux'


const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-indeX: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`


const Container = styled.div`

    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{

        opacity: 1;
    }
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`

const Image = styled.img`
    height: 75%;
    z-index: 2;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
        
    }
`
const Title = styled.h1`
    color: white;
    font-weight: 800;
    text-align: center;
    

`



const Price = styled.span`
    color: white;
    font-weight: 800;
    font-size: 20px;
`

const Product = ( { item } ) => {

    const dispatch = useDispatch();
    
    const [itemFavored, setItemFavored] = useState(false)

    let user = useSelector(state => state.user.currentUser);
    const wishlist = user.wishlist;

    const isItemInWishlist = wishlist?.some((wishlistItem) => wishlistItem._id === item._id);

    console.log( user.wishlist );
    const handleClick = ( item ) => {
        
        // //console.log( "isItemInWishlist: ", isItemInWishlist);
        if (!isItemInWishlist) {
            setItemFavored( !itemFavored );
            dispatch( addToWishlist(item) );
        } else {
            setItemFavored(false);
            dispatch( removeFromWishlist(item._id) );
        }
        console.log( 'ITEM CLICKED ON ', item )
    }
    return (
    <Container>
        <Circle />
        <Image src={ item.img } />
        <Info>
        <Title>{item.title}</Title>
        {/*<Price>${item.price}</Price>  ADD IF NEEDED*/}
        <Icon>
            <Link to={`/product/${item._id}`}>
                <SearchOutlined />
            </Link>
        </Icon>
        <Icon onClick={ () => handleClick( item )}>
            <Link>
            { itemFavored ? 
                <FavoriteBorderOutlined/> :
                <FavoriteBorderOutlined style={{color: 'red'}}/>
            }
                
            </Link>
        </Icon> 
        </Info>
    </Container>
    )
}

export default Product

// onClick={ () => alert( 'Added to Shopping Cart!')}
// onClick={ () => alert( 'Added to Wishlists!')}