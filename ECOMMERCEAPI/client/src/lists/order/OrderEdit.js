import React from 'react'
import {Edit, SimpleForm, TextInput, DateInput,SelectInput} from 'react-admin'

const OrderEdit = (props) => {
  return (

    <Edit title= 'Edit Order' {...props}>
        <SimpleForm>
            <TextInput disabled source='_id'/>
            <SelectInput
                source="status"
                choices={[
                    { id: 'Processing', name: 'Processing' },
                    { id: 'In-Transit', name: 'In Transit' },
                    { id: 'Delivered', name: 'Delivered' },
                ]}/>
            <TextInput source='address'/>
            <TextInput source='amount'/>
            <DateInput label='Created' source='createdAt'/>
        </SimpleForm>
    </Edit>
  )
}

export default OrderEdit