import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from '../dataProvider';
import ProductListSM from '../lists/product/ProductListSM'
import ProductEditSM from '../lists/product/ProductEditSM';







const SalesPanel = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="products" list={ProductListSM} edit={ProductEditSM}/>

    </Admin>
);

export default SalesPanel;
