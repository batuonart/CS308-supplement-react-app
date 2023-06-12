import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from '../dataProvider';
import ProductListSM from '../lists/product/ProductListSM'
import ProductEditSM from '../lists/product/ProductEditSM';
import ReturnlList from '../lists/returnl/ReturnlList';
import ReturnlEdit from '../lists/returnl/ReturnlEdit';






const SalesPanel = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="products" list={ProductListSM} edit={ProductEditSM}/>
        <Resource name="returnls" list={ReturnlList} edit={ReturnlEdit}/>
    </Admin>
);

export default SalesPanel;
