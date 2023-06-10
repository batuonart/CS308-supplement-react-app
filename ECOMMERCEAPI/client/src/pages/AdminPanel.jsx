import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from '../dataProvider';
import ProductList from '../lists/ProductList'
import UserList from '../lists/UserList'
import ProductCreate from '../lists/ProductCreate'
import ProductEdit from '../lists/ProductEdit'





const AdminPanel = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="users" list={UserList} />
        <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit}/>
    </Admin>
);

export default AdminPanel;
