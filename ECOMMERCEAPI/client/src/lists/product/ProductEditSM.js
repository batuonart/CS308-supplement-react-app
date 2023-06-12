import React from 'react'
import {Edit, SimpleForm, TextInput, DateInput,FormDataConsumer} from 'react-admin'

const ProductEditSM = (props) => {
  const handleIdAndDiscount = async (id, discountRate) => {
    // your code here
    console.log('Id:', id);
    console.log('Discount Rate:', discountRate);
    const url = `http://localhost:5000/api/products/set-discount/${id}`;

    // Make the API call
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discountRate }),
      });
      if (response.ok) {
        console.log('Discount rate updated successfully');
      } else {
        console.log('Failed to update discount rate');
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (

    <Edit title= 'Edit Product' {...props}>
        <SimpleForm>
            <TextInput disabled source='_id'/>
            <TextInput source='title'/>
            <TextInput source='discountRate'/>
            <TextInput source='price'/>
            <TextInput source='stockCount'/>
            <DateInput label='Created' source='createdAt'/>
            <FormDataConsumer>
                {({ formData, ...rest }) => {
                    // calling your function when id and discountRate change
                    if (formData._id && formData.discountRate) {
                      handleIdAndDiscount(formData._id, formData.discountRate);
                    }
                    return null; // render nothing here, or you can add additional fields depending on your requirements
                }}
            </FormDataConsumer>
        </SimpleForm>
    </Edit>
  )
}

export default ProductEditSM