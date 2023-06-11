import * as React from 'react';
import { Admin, Resource, DataProvider } from 'react-admin';
import dataProvider from '../dataProvider';
import UserList from '../lists/user/UserList'
import ProductList from '../lists/product/ProductList'
import ProductCreate from '../lists/product/ProductCreate'
import ProductEdit from '../lists/product/ProductEdit'
import OrderList from '../lists/order/OrderList'
import OrderEdit from '../lists/order/OrderEdit'
import CommentList from '../lists/comment/CommentList'
import CommentEdit from '../lists/comment/CommentEdit'


const AdminPanel = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="users" list={UserList} />
        <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit}/>
        <Resource name="orders" list={OrderList} edit={OrderEdit}/>
        <Resource name="comments" list={CommentList} edit={CommentEdit}/>
    </Admin>
);

export default AdminPanel;
