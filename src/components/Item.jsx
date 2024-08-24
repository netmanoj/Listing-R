import React from 'react';

function Item({ item, index, removeItem }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center' }}>
      {item}
      <button
        className="remove-item btn-link text-red"
        onClick={() => removeItem(index)}
        style={{ marginLeft: 'auto' }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </li>
  );
}

export default Item;
