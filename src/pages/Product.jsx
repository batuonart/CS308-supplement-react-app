import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { Add, Remove } from "@material-ui/icons"
import { mobile } from "../responsive"
import { useState } from "react"

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
    padding: 0 50px;
    ${mobile({ padding: "10px" })};
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })};
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
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
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    font-weight: 500;

    &:hover {
        background-color: #f8f4f4;
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


const Product = () => {

    const [counter, setCounter] = useState(1);
    let increment = () => setCounter( counter + 1 );
    let decrement = () => setCounter( counter > 1 ? counter - 1 : 1);

    return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <ImgContainer>
                <Image src="https://contents.mediadecathlon.com/p2016033/k$cbe31c6b34a986c3178bd957e38ec166/sq/protein-tozu.jpg?format=auto&f=800x0" />
            </ImgContainer>
            <InfoContainer>
                <Title>Protein Powder</Title>
                <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Desc>
                <Price>$ 20</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Flavor</FilterTitle>
                        <FilterColor color="#d97082"/>
                        <FilterColor color="#a85418"/>
                        <FilterColor color="#ffe5b4"/>
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            <FilterSizeOption>500g</FilterSizeOption>
                            <FilterSizeOption>1000g</FilterSizeOption>
                            <FilterSizeOption>1500g</FilterSizeOption>
                            <FilterSizeOption>2000g</FilterSizeOption>
                            <FilterSizeOption>2500g</FilterSizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <AmountButton onClick={decrement} >
                            <Remove />
                        </AmountButton>
                        <Amount>{counter}</Amount>
                        
                        <AmountButton onClick={increment}>
                            <Add />
                        </AmountButton>
                    </AmountContainer>
                    <Button>Add To Cart</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
    )
}



export default Product
