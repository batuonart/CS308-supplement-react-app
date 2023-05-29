import * as React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import UserList from '../components/UserList'



const AdminPanel = () => (
        <Admin dataProvider={restProvider("http://localhost:5000")}>
            <Resource name="users" list={UserList} />
        </Admin>


);

export default AdminPanel;
