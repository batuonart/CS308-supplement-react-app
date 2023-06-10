import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'

const UserList = (props) => {
  return (
    <List {...props}>
        <Datagrid>
            <TextField source='username'/>
            <TextField source='email'/>
            <DateField source='createdAt'/>
            <EditButton basePath='/users'/>
            <DeleteButton basePath='/users'/>


        </Datagrid>
    </List>
  )
}

export default UserList