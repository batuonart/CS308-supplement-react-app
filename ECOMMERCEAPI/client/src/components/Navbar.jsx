import React from 'react'
import styled from 'styled-components'
import { Search, ShoppingCartOutlined, ExitToAppOutlined, AccountCircle, Settings } from '@material-ui/icons'
import { Badge, Menu } from '@material-ui/core'
import { mobile } from "../responsive"
import Register from "../pages/Register"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/apiCalls'

const Container = styled.div`
    height: 60px;
    ${mobile({
        height: "50px"
    })};
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({
        padding: "10px 0px"
    })};
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
    ${mobile({
        display: "none"
    })};
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    ${mobile({
        width: "50px"
    })};
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({
        fontSize: "24px"
    })};
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({
        justifyContent: "center",
        flex: 2
    })};
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({
        fontSize: "12px",
        marginLeft: "10px"
    })};
`

const Greeting = styled.span`
    font-size: 20px;
    
    cursor: auto;
    font-weight: 700;
`
const ProfilePicture = styled.div`

`

const Navbar = () => {

    const user = useSelector( state => state.user.currentUser );
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        logout(dispatch);  
        localStorage.removeItem("persist:root");  
    };
    const quantity = useSelector( state => state.cart.products.length );
    //console.log("Navbar: ", quantity)
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <MenuItem>
                    <Link to="/search">
                            <Search style={{color: "black", fontSize: 25}}/>
                        </Link>
                    </MenuItem>
                        {/* <Input placeholder="Search"/> */}
                        
                </Left>
                <Center>
                    <Link to="/" style={{textDecoration: "none", color: "black"}}>
                        <Logo>
                            SUPPS
                        </Logo>
                    </Link>
                </Center>
                <Right>
                    { user ? 
                        <>
                        <MenuItem>
                            <Greeting>Hello {user.username}!</Greeting>
                        </MenuItem>
                        <MenuItem onClick={ handleClick }>
                            <Link to="/">
                                <ExitToAppOutlined />
                            </Link>
                        </MenuItem>
                        
                            { user.isAdmin ?
                            <>
                            <MenuItem>
                                <ProfilePicture>
                                    <Link to="/admin">
                                    <Settings style={{color: "black", fontSize: 30}}/>
                                    </Link>
                                </ProfilePicture>
                                </MenuItem>
                            </>
                            :<></> }
                            
                        
                        <MenuItem>
                            <ProfilePicture>
                                <Link to="/orders">
                                <AccountCircle style={{color: "black", fontSize: 30}}/>
                            </Link>
                            </ProfilePicture>
                        </MenuItem>
                       
                        </>
                        : <><Link to="/register" style={{ textDecoration: "none", color: "black" }}>
                            <MenuItem>REGISTER</MenuItem>
                        </Link><Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem>SIGN IN</MenuItem>
                            </Link></>
                    }
                    <Link to="/cart" style={{color: "black"}}>
                        <MenuItem>
                        <Badge badgeContent={quantity} color="primary" overlap="rectangular"> 
                            <ShoppingCartOutlined />
                        </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
