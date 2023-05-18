{cart.products.map( Product => (
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
))
}