import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import SearchMobile from "../components/SearchMobile"
import { publicRequest } from "../requestMethod"
import { Button } from '@material-ui/core'
import Product from '../components/Product'

const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })};
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`
//////////////////////////////// TRY ////////////////////////////////

const Option = styled.option``

const Input = styled.input`
    border: none;
`

const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  
  & > div {
    flex-basis: calc(33.33% - 10px); /* 33.33% is the width of each item, 10px is the space between items */
    margin: 5px; /* margin between items */
  }
`
//////////////////////////////// TRY ////////////////////////////////

const ProductList = () => {

  const location = useLocation();
  const cat = location.pathname.split( "/" )[2] ;

  const [ filters, setFilters ] = useState({});
  const [ sort, setSort ] = useState("newest");
  
  const handleFilters = ( e ) => {
    const val = e.target.value;
    setFilters( {
      ...filters,
      [ e.target.name ]: val,
    });
  }

  //////////////////////////////// TRY ////////////////////////////////

  const[word,setWord] = useState("");
  const[products,setProducts] = useState([]);

  const handleWord = ( e ) => {

      setWord(e.target.value);
  }

  const addWord = async () => {
      const res1 = await publicRequest.get("/products/findbyall/" + word);
      setProducts(res1.data)
  }


  //////////////////////////////// TRY ////////////////////////////////


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Products</Title>

      <FilterContainer>
        <Filter>
            <FilterText>Filter Products: </FilterText>
            <Select name="aroma" onChange={ handleFilters }>
                <Option disabled>
                Flavor
                </Option>
                <Option>Cholocate</Option>
                <Option>Cookie</Option>
                <Option>Strawberry</Option>
                <Option>Banana</Option>
                <Option>Lemon Cheescake</Option>
                <Option>Watermelon</Option>
                <Option>Peach</Option>
                <Option>Lemon</Option>
                <Option>unflavored</Option>
            </Select>
            <Select name="weight" onChange={ handleFilters }>
                <Option disabled>
                Size
                </Option>
                <Option>1000 mL</Option> 
          </Select>
        </Filter>

        {/* //////////////////////////////// TRY //////////////////////////////// */}

        <Filter>
            <FilterText>Search by Name:</FilterText>
            <Input placeholder="Search" onChange={ (e) => handleWord(e) }/>
            <Button onClick={() => {
                addWord();
                }} style={{width: "200px"}}>Search by Title
            </Button>
        </Filter>

        {/* //////////////////////////////// TRY //////////////////////////////// */}

        <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={ (e) => setSort( e.target.value )}>
                <Option selected value="newest">Newest</Option>
                <Option value="asc">Price (asc)</Option>
                <Option value="desc">Price (desc)</Option>
            </Select>
        </Filter>
      </FilterContainer>

      <ProductContainer>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id}>
              <Product item={product} />
            </div>
          ))
        ) : (
          <div>No results.</div>
        )}
      </ProductContainer>

      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
