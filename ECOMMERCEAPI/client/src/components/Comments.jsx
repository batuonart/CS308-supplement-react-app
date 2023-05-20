import React from 'react'
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
import { useDispatch, useSelector } from 'react-redux'

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
const Comments = () => {
    //comments
    const location = useLocation();
    const[comments,setComments] = useState([]);
    const[userRating,setRating] = useState(0);
    const[userDesc,setDesc] = useState("");
    const id = location.pathname.split( "/" )[2] ;

    
    useEffect(() => {
        const getProduct = async () => {
            try {
                const commentData = await publicRequest.get("/comments/findbyproduct/" + id)
                setComments(commentData.data)
            } catch (error) {
                
            }
        };
        getProduct()
    }, [id])



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
            userId : user._id,
        }
        await publicRequest.post("/comments/", comment)
    }
 
 


  return (
    
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
  )
}

export default Comments