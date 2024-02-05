import React from 'react';

const TableHeader = ({ headers }) => {
    return (
      <>
        {headers.map((header, index) => (
          <th key={index}>{header.label}</th>
        ))}
      </>
    );
  };

export default TableHeader;