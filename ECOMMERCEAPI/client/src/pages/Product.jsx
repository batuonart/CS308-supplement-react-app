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
const CommentContainer = styled.div`
    margin-left: 30px;
`; 
const Rating = styled.div`
    font-weight: 700;
    font-size: 30px;
    color:teal;
`
const CommentName = styled.div`
    font-weight: 800;
`
const CommentDesc = styled.div`
    margin-top: 10px;
    font-weight: 500;
`

const CommentSubmit = styled.div`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    margin: 10px 0px;;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid lightgray;
`
const CommentLine = styled.hr`
    margin: 30px;
`

const ErrorTitle = styled.h2`
    font-weight: 300;
    margin: 20px 0;
    color: red;
    display: flex;
`

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split( "/" )[2] ;
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
       //comments
    const[comments,setComments] = useState([]);
    const[userRating,setRating] = useState(0);
    const[userDesc,setDesc] = useState("");
    const userId = 31;
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get( "/products/find/" + id )
                setProduct( res.data )
                const commentData = await publicRequest.get("/comments/findbyproduct/" + id)
                setComments(commentData.data)
            } catch (error) {
                
            }
        };
        getProduct()
    }, [id])

    const [selectedAroma, setAroma] = useState("");
    const [selectedSize, setSize] = useState("");

     //ADD COMMENT
    const handleRating = ( e ) => {

        setRating(e.target.value);
    }
    const handleDesc = ( e ) => {

        setDesc(e.target.value);
    }
    const user = useSelector( state => state.user.currentUser );

    const addUserComment = async () => {
        let comment = {
            rating: userRating,
            usercomment: userDesc,
            productId: id,
            username: user.username,
            userId : userId
        }
        await publicRequest.post("/comments/", comment)
    }

    const [quantity, setQuantity] = useState(1);
    let increment = () => setQuantity( quantity + 1 );
    let decrement = () => setQuantity( quantity > 1 ? quantity - 1 : 1);

    const handleClick = () => {
    
        if (quantity < product.rating) {
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
                <Image src="https://contents.mediadecathlon.com/p1960881/k$c3ab56961217a74264138e62cfab0177/sq/gainer.jpg?format=auto&f=800x0" />
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
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
                    <Button onClick={handleClick}>Add To Cart</Button>
                </AddContainer>
                <ErrorTitle>{errorMessage}</ErrorTitle>
            </InfoContainer>
        </Wrapper>
        <CommentContainer>
            <CommentSubmit>
                <h2>Add Comment</h2>
                <hr/>
                {user ? 
                    <><Input placeholder="Rating" style={{width: "50px"}} onChange={ (e) => handleRating(e) }/>
                    <Input placeholder="Text"style={{width: "500px"}} onChange={ (e) => handleDesc(e) }/>
                    <Button onClick={() => {
                    addUserComment();
                    window.location.reload();
                    }} style={{width: "100px"}}>SUBMIT</Button>
                    </>:
                    <div>Please sign in first.</div>


                }
               
            </CommentSubmit>
            <br/>
            <h2>Comments</h2>
            {comments.length > 0 ? (
                comments.map(comment => {
                    return <div key={comment.id}> 
                    <CommentLine/>
                    <Rating><StarOutlined/>{comment.rating}</Rating>
                    <CommentName>{comment.userName} </CommentName>
                    <CommentDesc> 
                    {comment.isPassed === true ? (
                    <div>{comment.userComment}</div>
                    ) : (
                    <div><i>Comment awaits approval</i></div>
                    )}
                    </CommentDesc></div>
                })
            ):(<div>No comments yet.</div>)}
        </CommentContainer>
        <Newsletter />
        <Footer />
    </Container>
    )
}



export default Product
