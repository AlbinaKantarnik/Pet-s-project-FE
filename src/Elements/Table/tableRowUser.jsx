import React from 'react';
import { Link } from 'react-router-dom';

const TableRowUser = ({ data, headers }) => {
  return (
    <>
      {data.map((rowData) => (
        <tr key={rowData.id}>
          {headers.map((header) => (
            <td key={`${rowData.id}-${header.key}`}>{rowData[header.key]}</td>
          ))}
        <td><button><Link to={ `/profile/${rowData.id}`}>Profile</Link></button></td>
        <td><button><Link to={ `/mypets/${rowData.id}`}>Pets</Link></button></td>
        </tr>
      ))}
    </>
  );
};

export default TableRowUser;
