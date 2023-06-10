import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'

const ProductList = (props) => {
  return (
    <List {...props}>
        <Datagrid>
            <TextField source='title'/>
            <TextField source='stockCount'/>
            <TextField source="rating" label="Rating" />
            <DateField source='createdAt'/>
            <EditButton basePath='/users'/>
            <DeleteButton basePath='/users'/>


        </Datagrid>
    </List>
  )
}

export default ProductList