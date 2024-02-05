import React from 'react';

const TableRowUser = ({ data, headers }) => {
  return (
    <>
      {data.map((rowData) => (
        <tr key={rowData.id}>
          {headers.map((header) => (
            <td key={`${rowData.id}-${header.key}`}>{rowData[header.key]}</td>
          ))}
        <td><button>Profile</button></td>
        <td><button>Pets</button></td>
        </tr>
      ))}
    </>
  );
};

export default TableRowUser;
