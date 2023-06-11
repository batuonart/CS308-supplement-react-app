import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from '../dataProvider';
import ProductList from '../lists/product/ProductList'







const SalesPanel = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="products" list={ProductList}/>

    </Admin>
);

export default SalesPanel;
