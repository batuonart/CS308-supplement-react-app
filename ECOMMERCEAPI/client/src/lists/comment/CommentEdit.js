import React from 'react'
import {Edit, SimpleForm, TextInput, DateInput, BooleanInput} from 'react-admin'

const CommentEdit = (props) => {
  return (

    <Edit title= 'Edit Product' {...props}>
        <SimpleForm>
            <TextInput disabled source='_id'/>
            <BooleanInput label='Verified' source="isPassed" />
            <DateInput label='Created' source='createdAt'/>
        </SimpleForm>
    </Edit>
  )
}

export default CommentEdit