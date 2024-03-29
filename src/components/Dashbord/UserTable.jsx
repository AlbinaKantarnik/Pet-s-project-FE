import React from 'react';
import TableHeader from '../../Elements/Table/tableHeader';
import TableRowUser from '../../Elements/Table/tableRowUser';

const headers = [
    { key: 'id', label: 'ID' },
    { key: 'first_name', label: 'First name' },
    { key: 'last_name', label: 'Last name' },
    { key: 'email', label: 'Email' },
    { key: 'phone_number', label: 'Phone number' },
    { key: 'name_role', label: 'Role' },
];

const UserTable = ({ rowData, key }) => {

    return (
    
            <table key={key}>
                <thead>
                    <tr>
                        <TableHeader headers={headers} />
                        <th>User's profile</th>
                        <th>User's pets</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowUser headers={headers} data={rowData} />
                </tbody>
            </table>
    
    );
};

export default UserTable;