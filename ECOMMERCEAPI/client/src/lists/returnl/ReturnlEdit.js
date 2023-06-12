import React from 'react'
import {Edit, SimpleForm, TextInput, DateInput, BooleanInput} from 'react-admin'

const ReturnlEdit = (props) => {
  return (

    <Edit title= 'Check Refunds' {...props}>
        <SimpleForm>
            <TextInput disabled source='_id'/>
            <BooleanInput source='returnAcpt'/>
            <DateInput label='Created' source='createdAt'/>
        </SimpleForm>
    </Edit>
  )
}

export default ReturnlEdit