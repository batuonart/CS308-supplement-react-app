import React from 'react'
import {Edit, SimpleForm, TextInput, DateInput} from 'react-admin'

const ProductEditSM = (props) => {
  return (

    <Edit title= 'Edit Product' {...props}>
        <SimpleForm>
            <TextInput disabled source='_id'/>
            <TextInput source='title'/>
            <TextInput source='discountRate'/>
            <TextInput source='price'/>
            <TextInput source='stockCount'/>
            <DateInput label='Created' source='createdAt'/>
        </SimpleForm>
    </Edit>
  )
}

export default ProductEditSM