import React from 'react';

const TableRowPets = ({ data, headers }) => {
  return (
    <>
      {data.map((rowData) => (
        <tr key={rowData.id}>
          {headers.map((header) => (
            <td key={`${rowData.id}-${header.key}`}>{rowData[header.key]}</td>
          ))}
        <td><button>Single page</button></td>
        <td><button>Edit</button></td>
        </tr>
      ))}
    </>
  );
};

export default TableRowPets;
