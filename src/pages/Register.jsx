import styled from "styled-components"
import { Link } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    //background: linear-gradient( rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5) ),url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    //background: linear-gradient( rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5) ),url("https://img.freepik.com/free-vector/sports-nutrition-poster_1284-71965.jpg?w=1380&t=st=1680864665~exp=1680865265~hmac=1c3bff31c56804a10464810ab4010f866ff4ae58ea3ac589e8cacb0d5f10cdef") center;
    background: url("https://i.imgur.com/1jAOHs3.jpeg");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const Wrapper = styled.div`
    width: 30%;
    height: 78%;
    padding: 20px;
    background-color: white;
    position: absolute;
    top: 50px;
    left: 65px;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`


const Registered = styled.h4`
    margin-top: 20px;
    display: flex;
    color: teal;
`
const LoginComp = styled.div`
    margin-left: 5px;
`
const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder="Name"/>
                <Input placeholder="Last name"/>
                <Input placeholder="Email"/>
                <Input placeholder="Address" />
                <Input placeholder="Phone Number" type="number" />
                <Input placeholder="Username"/>
                <Input placeholder="Password"/>
                <Input placeholder="Confirm password"/>
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button>CREATE ACCOUNT</Button>
            </Form>
            <Registered>
                Already have an account? 
                <LoginComp>
                    <Link to="/login" style={{color: "black"}}>
                        Login.
                    </Link>
                </LoginComp>
            </Registered>
        </Wrapper>
    </Container>
  )
}

export default Register
