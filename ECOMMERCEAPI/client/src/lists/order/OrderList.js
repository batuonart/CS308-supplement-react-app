import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, ArrayField, SingleFieldList, ChipField} from 'react-admin'

const OrderList = (props) => {
  return (
    <List {...props}>
        <Datagrid>

            <TextField source='_id'/>
            <TextField source='status'/>
            <TextField source='address'/>
            <TextField source='amount'/>
            <ArrayField source="products">
              <SingleFieldList>
                <ChipField source="productTitle"/>
              </SingleFieldList>
            </ArrayField>
            <DateField source='createdAt'/>
            <TextField source='invoiceLink'/>
            <EditButton basePath='/users'/>
            <DeleteButton basePath='/users'/>


        </Datagrid>
    </List>
  )
}

export default OrderList