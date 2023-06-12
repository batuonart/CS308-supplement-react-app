import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, BooleanField} from 'react-admin'

const ReturnlList = (props) => {
  return (
    <List {...props}>
        <Datagrid>
            <TextField source='buyerId'/>
            <TextField source='productId'/>
            <TextField source='quantity'/>
            <BooleanField label="Confirm Refund?" source='returnAcpt'/>
            <DateField source='createdAt'/>
            <EditButton basePath='/returnls'/>
            <DeleteButton basePath='/returnls'/>

        </Datagrid>
    </List>
  )
}

export default ReturnlList