import React from 'react';

function Filter({ filterValue, filterItems }) {
  return (
    <input
      type="text"
      className="form-input-filter"
      id="filter"
      placeholder="Filter Items"
      value={filterValue}
      onChange={(e) => filterItems(e.target.value)}
    />
  );
}

export default Filter;
