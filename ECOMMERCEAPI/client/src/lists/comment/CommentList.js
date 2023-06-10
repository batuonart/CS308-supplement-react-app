import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton,BooleanField} from 'react-admin'

const CommentList = (props) => {
  return (
    <List {...props}>
        <Datagrid>
            <TextField source='productId'/>
            <TextField source='userName'/>
            <TextField source='userComment'/>
            <TextField source='rating'/>
            <BooleanField source='isPassed'/>
            <DateField source='createdAt'/>
            <EditButton basePath='/users'/>
            <DeleteButton basePath='/users'/>
        </Datagrid>
    </List>
  )
}

export default CommentList