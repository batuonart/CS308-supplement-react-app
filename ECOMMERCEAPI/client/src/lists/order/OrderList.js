import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'

const OrderList = (props) => {
  return (
    <List {...props}>
        <Datagrid>

            <TextField source='_id'/>
            <TextField source='status'/>
            <TextField source='address'/>
            <TextField source='amount'/>
            <DateField source='createdAt'/>
            <EditButton basePath='/users'/>
            <DeleteButton basePath='/users'/>


        </Datagrid>
    </List>
  )
}

export default OrderList