import * as React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from '../dataProvider';


const AdminPanel = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default AdminPanel;
