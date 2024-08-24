import React from 'react';

function ItemForm({ inputValue, setInputValue, addItem }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(inputValue);
  };

  return (
    <form id="item-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          id="item-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter Item"
        />
      </div>
      <div className="form-control">
        <button type="submit" className="btn">
          <i className="fa-solid fa-plus"></i> Add Item
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
