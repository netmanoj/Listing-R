import React from 'react';

function ItemList({ items, removeItem, setItemToEdit }) {
  return (
    <ul id="item-list" className="items">
      {items.map((item, index) => (
        <li key={index} onClick={() => setItemToEdit(item, index)}>
          {item}
          <button
            className="remove-item btn-link text-red"
            onClick={(e) => {
              e.stopPropagation();
              removeItem(index);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
