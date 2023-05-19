import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Add, DeleteOutlineOutlined, DeleteOutlined, Remove } from '@material-ui/icons'
import { mobile } from "../responsive";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../redux/productRedux';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect } from 'react';
import { userRequest } from '../requestMethod';
import { useNavigate } from 'react-router-dom';

const KEY = process.env.REACT_APP_STRIPE;

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
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
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
    background-color: ${props => props.color};
`
const ProductColor2 = styled.span`
    font-weight: 400;
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
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
        font-size: 20px;
    }
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

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    }
    // console.log( 'stripeToken => ', stripeToken );

    let priceArray = []
    let sum;
    const navigate = useNavigate();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenID: stripeToken.id,
                    amount: sum * 100,
                });
                navigate("../success", { state: { stripeData: res.data, products: cart } });
            } catch (error) { }
        };

        if (stripeToken) {
            makeRequest();
        }
    }, [stripeToken, sum, navigate]);

    const user = useSelector( state => state.user.currentUser );


    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to={`/`}>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag({cart.products.length})</TopText>
                    </TopTexts>
                    <TopButton type='filled'>CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product>
                                <ProductDetail>
                                    <Image src={"https://productimages.hepsiburada.net/s/199/1500/110000169922427.jpg"} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product._id}
                                        </ProductId>
                                        <ProductColor2>
                                            <b>Aroma: </b> {product.selectedAroma}
                                        </ProductColor2>
                                        <ProductSize>
                                            <b>Size:</b> {product.selectedSize}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        {/* <Add /> */}
                                        <ProductAmount> Amount: {product.quantity}</ProductAmount>
                                        {/* <Remove /> */}
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        $ {product.price * product.quantity}
                                    </ProductPrice>
                                    <DeleteButton onClick={() => dispatch(removeProduct(product._id))}>
                                        <DeleteOutlined style={{ color: "red" }} />
                                    </DeleteButton>
                                </PriceDetail>

                            </Product>
                        ))}

                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>${cart.products.map((p) => {
                                priceArray.push(p.price * p.quantity);
                                sum = priceArray.reduce((a, b) => a + b)

                            })}{sum}</SummaryItemPrice>
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
                            <SummaryItemPrice>${sum}</SummaryItemPrice>
                        </SummaryItem>
                        
                        {user ?                        
                            <StripeCheckout
                                name="SUPPS"
                                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                                billingAddress
                                shippingAddress
                                description={`Your total is $${sum}`}
                                amount={sum * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button> CHECKOUT NOW! </Button>
                            </StripeCheckout>
                            :
                            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                                <Button>All Set? Sign In!</Button>
                            </Link>
                        }

                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
