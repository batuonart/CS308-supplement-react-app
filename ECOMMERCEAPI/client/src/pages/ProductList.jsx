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

const Option = styled.option``

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
                {/* <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Green</Option> */}
            </Select>
            <Select name="weight" onChange={ handleFilters }>
                <Option disabled>
                Size
                </Option>
                <Option>1000 mL</Option> 
                {/* <Option>500 mL</Option> 
                <Option>3000 Gr</Option> 
                <Option>500 Gr</Option> 
                <Option>350 Gr</Option> 
                <Option>3500 Gr</Option> 
                <Option>2800 Gr</Option> 
                <Option>650 Gr</Option> 
                <Option>2600 Gr</Option>  */}
                

                {/* <Option>1000G</Option>
                <Option>1500G</Option>
                <Option>2000G</Option>
                <Option>2500G</Option> */}
          </Select>
        </Filter>
        <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={ (e) => setSort( e.target.value )}>
                <Option selected value="newest">Newest</Option>
                <Option value="asc">Price (asc)</Option>
                <Option value="desc">Price (desc)</Option>
            </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
