import React from 'react'
import {Edit, SimpleForm, TextInput, DateInput} from 'react-admin'

const OrderEdit = (props) => {
  return (

    <Edit title= 'Edit Order' {...props}>
        <SimpleForm>
            <TextInput disabled source='_id'/>
            <TextInput source='status'/>
            <TextInput source='address'/>
            <TextInput source='amount'/>
            <DateInput label='Created' source='createdAt'/>
        </SimpleForm>
    </Edit>
  )
}

export default OrderEdit