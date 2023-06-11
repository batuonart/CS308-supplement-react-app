import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { Add, Remove, StarOutlined } from "@material-ui/icons"
import { mobile } from "../responsive"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { publicRequest } from "../requestMethod"
import { addProduct } from "../redux/productRedux"
import { useDispatch, useSelector } from 'react-redux'
import Comments from "../components/Comments"

const Container = styled.div``

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })};
`

const ImgContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })};
`

const InfoContainer = styled.div`
    flex: 1;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;
    ${mobile({ padding: "10px" })};
`

const Title = styled.h1`
    font-weight: 'bold';
    color: black;
    font-size: 32px;
    text-align: left;
    padding-right: 50px;  
`
const DescTitle = styled.h1`
    font-weight: 'bold';
    color: black;
    font-size: 32px;
    text-align: left;
    padding-right: 50px;  
    padding-left: 30px;
`
const Desc = styled.p`
    margin: 20px 0;
    max-height: 120px; 
    overflow-y: auto; 
    padding: 0 30px;
    font-size: 16px; 
    line-height: 1.5; 

    &::-webkit-scrollbar {
        width: 8px; /* Set width of the scrollbar */
    }
    &::-webkit-scrollbar-thumb {
        background: #888; /* Set the scroll handle color */
        border-radius: 4px; /* Optionally, add rounded corners to the scroll handle */
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555; /* Color of the scroll handle on hover */
    }
`

const Price = styled.span`
    font-weight: 700;
    font-size: 40px;
    display: flex;
    align-items: left;
    justify-content: left;
    padding-top: 50px;
    padding-bottom: 50px;
`

const FilterContainer = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: left;
    text-align: left;
    gap: 20px;
    ${mobile({ width: "100%" })};
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 24px;
    font-weight: bald;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${ (props) => props.color };
    margin: 0px 5px;
    cursor: pointer;

`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    font-size: 18px;
    font-weight: 200;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 40px;
    padding-right: 60px;
    ${mobile({ width: "100%" })};

`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;

`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 800;
    color: #5c5c5c;

    &:hover {
        background-color: teal;
        color: white;
    }
`

const AmountButton = styled.button`
    
    border: none;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #f8f4f4;
    }
`

const ErrorTitle = styled.h2`
    font-weight: 300;
    margin: 20px 0;
    color: red;
    display: flex;
`
const StockButton = styled.div`
    margin-left: 20px;
`
const StockAmount = styled.div`
    margin-left: 20px;

`

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split( "/" )[2] ;
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});  
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get( "/products/find/" + id )
                setProduct( res.data )
            } catch (error) {
                
            }
        };
        getProduct()
    }, [id])

    const [selectedAroma, setAroma] = useState("");
    const [selectedSize, setSize] = useState("");

     //ADD COMMENT
   
    const user = useSelector( state => state.user.currentUser );

   

    const [quantity, setQuantity] = useState(1);
    let increment = () => setQuantity( quantity + 1 );
    let decrement = () => setQuantity( quantity > 1 ? quantity - 1 : 1);

    const handleClick = () => {
    //! change later
        if (quantity <= product.stockCount) {
            dispatch(addProduct({ product, quantity, selectedAroma, selectedSize }));
            setErrorMessage(''); // Reset the error message when the condition is met
        } 
        else {
            // Set the error message when the requested quantity is greater than the available stock
            
            setErrorMessage('Requested quantity is greater than available stock.');
        }
    }

    const handleAromaChange = (e) => {
        setAroma( e.target.value );
    }

    // console.log("Selected aroma, size: ", selectedAroma, selectedSize)
    return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <ImgContainer>
                <Image src= {product.img} />
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                
                <Price>${product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Flavor</FilterTitle>
                        
                        <FilterSize onChange={handleAromaChange}>
                            <FilterSizeOption disabled selected value="">Select Aroma</FilterSizeOption>
                            {product.aroma?.map( (aroma, idx) => {
                                
                                if (aroma.includes(",")) {
                                    const opt = aroma.split(",");
                                    return (
                                        <>
                                        {opt.map( (op) => (
                                            <FilterSizeOption key={idx} value={op.trim()} onClick={ () => setAroma(op.trim())}>{op.trim()}</FilterSizeOption>
                                        ))}
                                        </>
                                    )
                                } else {
                                    return <FilterSizeOption key={idx} value={aroma} onClick={ () => setAroma(aroma)}>{aroma}</FilterSizeOption>
                                }
                            }
                            )}
                            
                        </FilterSize>
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={ (e) => setSize(e.target.value)}>
                            <FilterSizeOption disabled selected value="">Select Size</FilterSizeOption>
                            <FilterSizeOption>{product?.size}</FilterSizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <AmountButton onClick={decrement} >
                            <Remove />
                        </AmountButton>
                        <Amount>{quantity}</Amount>
                        
                        <AmountButton onClick={increment}>
                            <Add />
                        </AmountButton>
                    </AmountContainer>
                        <StockButton>
                            {product.stockCount === 0 ? (
                                <p>Sorry, the product is out of stock!</p>
                                ) : (
                                    <Button onClick={handleClick} disabled={quantity > product.stockCount}>
                                    Add To Cart
                                </Button>
                            )} 
                        </StockButton>                              
                        <StockAmount>Stock: {product.stockCount}</StockAmount>
                </AddContainer>
                    <ErrorTitle>{errorMessage}</ErrorTitle>
            </InfoContainer>
        </Wrapper>
        <DescTitle>Description:</DescTitle>
        <Desc>{product.desc}</Desc>
        <Comments/>
        <Newsletter />
        <Footer />
    </Container>
    )
}



export default Product
