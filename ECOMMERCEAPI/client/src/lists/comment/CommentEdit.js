import React from 'react'
import {Edit, SimpleForm, TextInput, DateInput} from 'react-admin'

const CommentEdit = (props) => {
  return (

    <Edit title= 'Edit Product' {...props}>
        <SimpleForm>
            <TextInput disabled source='_id'/>
            <TextInput source='title'/>
            <TextInput multiline source='desc'/>
            <TextInput source='img'/>
            <TextInput source='price'/>
            <TextInput source='stockCount'/>
            <DateInput label='Created' source='createdAt'/>
        </SimpleForm>
    </Edit>
  )
}

export default CommentEdit