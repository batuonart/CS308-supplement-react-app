import React from 'react'
import {Create, SimpleForm, TextInput, DateInput} from 'react-admin'

const ProductCreate = (props) => {
  return (

    <Create title= 'New Product' {...props}>
        <SimpleForm>
            <TextInput source='title'/>
            <TextInput multiline source='desc'/>
            <TextInput source='img'/>
            <TextInput source='price'/>
            <TextInput source='stockCount'/>
            <DateInput label='Created' source='createdAt'/>
        </SimpleForm>
    </Create>
  )
}

export default ProductCreate