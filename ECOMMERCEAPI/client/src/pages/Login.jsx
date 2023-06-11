import styled from "styled-components"
import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons"
import { useState } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { login } from "../redux/apiCalls"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: url("https://i.imgur.com/1jAOHs3.jpeg");
    /* background: linear-gradient( rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5) ), url("https://i.imgur.com/1jAOHs3.jpeg") center; */
    background-size: cover;
    display: flex;
    /* align-items: center;
    justify-content: flex-start; */
    position: relative;
    
`

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    position: absolute;
    top: 50px;
    left: 65px;
    border-radius: 5px;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
`


const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 5px;

    --c: white; /* the color */
    --b: .1em;    /* border length*/
    --d: 20px;    /* the cube depth */
    
    --_s: calc(var(--d) + var(--b));
    
    color: teal;
    border: 1px solid teal;
    border-width: var(--b) var(--b) var(--_s) var(--_s);
    background:
        conic-gradient(at left var(--d)  bottom var(--d),
        #0000 90deg, rgb(255 255 255 /0.3) 0 225deg,rgb(255 255 255 /0.6) 0) border-box,
        conic-gradient(at left var(--_s) bottom var(--_s),
        #0000 90deg,var(--c) 0) 0 100%/calc(100% - var(--b)) calc(100% - var(--b))  border-box;
    transform: translate(calc(var(--d)/-1),var(--d));
    clip-path: 
        polygon(
        var(--d) 0%, 
        var(--d) 0%, 
        100% 0%, 
        100% calc(100% - var(--d)),
        100% calc(100% - var(--d)),
        var(--d) calc(100% - var(--d))
        );
    transition: 0.5s;
    /* */
    &:hover {
        background-color: #006C6C;
        color: white;
        transform: translate(0,0);
        clip-path: 
            polygon(
            0% var(--d), 
            var(--d) 0%, 
            100% 0%, 
            100% calc(100% - var(--d)), 
            calc(100% - var(--d)) 100%, 
            0% 100%
        );

    }

    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const InfoContainer =  styled.div`
    background-color: white;
    position: absolute;
    top: 680px;
    left: 65px;
    bottom: 100px;
    width: 27%;
    padding: 5px;
    //display: block;
    border-radius: 5px;
    
`
const InfoText = styled.p`
    padding: 15px 0;
    text-align: left;
    font-size: 24px;
    font-weight: 600;
    
`

const SocialContainer = styled.div`
    color: black;
    display: flex;
    width: 50px;
    height: 15px;    
`;

const Error = styled.span`
    color: red;
`


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector( (state) => state.user );

    

    const handleUsername = ( e ) => {

        setUsername(e.target.value);
    }
    const handlePassw = ( e ) => {

        setPassword(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });    
    };
    
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" onChange={ (e) => handleUsername(e) }/>
                    <Input placeholder="password" type="password" onChange={ (e) => handlePassw(e) }/>
                    <Button onClick={ handleClick } disabled={ isFetching }>LOGIN</Button>
                    {error && <Error>Something went wrong...</Error>}
                    <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>     
        </Container>
    )
}

export default Login
