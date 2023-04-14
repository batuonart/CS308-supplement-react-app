import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Add, DeleteOutlineOutlined, Remove } from '@material-ui/icons'
import { mobile } from "../responsive";
import { useState } from 'react'
import { hover } from '@testing-library/user-event/dist/hover'

const Container = styled.div``

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })};
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${ props => props.type === "filled" && "none"};
    background-color: ${ props => props.type === "filled" ? "black" : "transparent"};
    color: ${ props => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({ display: "none" })};
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })};
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })};
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color };
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })};
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })};
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const WrapAmount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${ props => props.type === "total" && "500"};
    font-size: ${ props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

const AmountButton = styled.button`
    
    border: none;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    margin-right: 5px;

    &:hover {
        background-color: #f8f4f4;
    }
`

const DeleteButton = styled.button`

    border: none;
    background-color: white;
    cursor: pointer;
`

const Cart = () => {

    const [amount, setAmount] = useState(1);
    const increment = () => setAmount( amount + 1 );
    let decrement = () => setAmount( amount > 1 ? amount - 1 : 1);

    const [amount2, setAmount2] = useState(1);
    const increment2 = () => setAmount2( amount2 + 1 );
    let decrement2 = () => setAmount2( amount2 > 1 ? amount2 - 1 : 1);

    const handleClick = () => alert( 'Product is removed' );

    return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist(0)</TopText>
                </TopTexts>
                <TopButton type='filled'>CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    <Product>
                        <ProductDetail>
                            <Image src="https://productimages.hepsiburada.net/s/199/1500/110000169922427.jpg" />
                            <Details>
                                <ProductName><b>Product: </b> WHEY Protein</ProductName>
                                <ProductId><b>ID: </b> 9841132496</ProductId>
                                {/* <ProductColor color='black'/> */}
                                {/* <ProductSize><b>Price: </b> 37.5</ProductSize> */}
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <WrapAmount>
                                <ProductAmountContainer>
                                    <AmountButton onClick={increment}>
                                        <Add />
                                    </AmountButton>
                                    <ProductAmount>{amount}</ProductAmount>
                                    <AmountButton onClick={decrement}>
                                        <Remove />
                                    </AmountButton>
                                    <DeleteButton onClick={handleClick}>
                                        <DeleteOutlineOutlined style={{color: "red"}}/>
                                    </DeleteButton>
                                </ProductAmountContainer>
                            </WrapAmount>
                            <ProductPrice>$ 30</ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr/>
                    <Product>
                        <ProductDetail>
                            <Image src="https://contents.mediadecathlon.com/p1960881/k$c3ab56961217a74264138e62cfab0177/sq/gainer.jpg?format=auto&f=800x0" />
                            <Details>
                                <ProductName><b>Product: </b> Gainers</ProductName>
                                <ProductId><b>ID: </b> 9841132496</ProductId>
                                {/* <ProductColor color='gray'/> */}
                                {/* <ProductSize><b>Size: </b> M</ProductSize> */}
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <WrapAmount>
                                <ProductAmountContainer>
                                    <AmountButton onClick={increment2}>
                                        <Add />
                                    </AmountButton>
                                    <ProductAmount>{amount2}</ProductAmount>
                                    <AmountButton onClick={decrement2}>
                                        <Remove />
                                    </AmountButton>
                                    <DeleteButton onClick={handleClick}>
                                        <DeleteOutlineOutlined style={{color: "red"}}/>
                                    </DeleteButton>
                                </ProductAmountContainer>    
                            </WrapAmount>
                            <ProductPrice>$ 20</ProductPrice>
                        </PriceDetail>
                    </Product>
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ 80</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ 80</SummaryItemPrice>
                    </SummaryItem>
                    <Button>CHECKOUT NOW</Button>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
    )
}

export default Cart
