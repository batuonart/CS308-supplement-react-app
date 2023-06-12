import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'

const ProductListSM = (props) => {
  return (
    <List {...props}>
        <Datagrid>
            <TextField source='title'/>
            <TextField source='stockCount'/>
            <TextField source='discountRate'/>
            <DateField source='createdAt'/>
            <EditButton basePath='/products'/>
            <DeleteButton basePath='/products'/>


        </Datagrid>
    </List>
  )
}

export default ProductListSM