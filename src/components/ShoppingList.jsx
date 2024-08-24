import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import Filter from './Filter';


function ShoppingList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(null);

  useEffect(() => {
    const itemsFromStorage = JSON.parse(localStorage.getItem('items')) || [];
    setItems(itemsFromStorage);
    checkUI(itemsFromStorage);
  }, []);

  const checkUI = (currentItems) => {
    const clearBtn = document.getElementById('clear');
    const itemFilter = document.getElementById('filter');
    if (currentItems.length === 0) {
      clearBtn.style.display = 'none';
      itemFilter.style.display = 'none';
    } else {
      clearBtn.style.display = 'block';
      itemFilter.style.display = 'block';
    }
    resetForm();
  };

  const resetForm = () => {
    setInputValue('');
    setIsEditMode(false);
    setEditItemIndex(null);
    const formBtn = document.querySelector('button[type="submit"]');
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
  };

  const addItem = (newItem) => {
    if (newItem.trim() === '') {
      alert('Please add an item');
      return;
    }

    if (isEditMode) {
      const updatedItems = items.map((item, index) =>
        index === editItemIndex ? newItem : item
      );
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
    } else {
      if (items.includes(newItem)) {
        alert('That item already exists!');
        return;
      }
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
    }
    resetForm();
    checkUI([...items, newItem]);
  };

  const removeItem = (index) => {
    if (window.confirm('Are you sure?')) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
      checkUI(updatedItems);
    }
  };

  const clearItems = () => {
    setItems([]);
    localStorage.removeItem('items');
    checkUI([]);
  };

  const setItemToEdit = (item, index) => {
    setInputValue(item);
    setIsEditMode(true);
    setEditItemIndex(index);
    const formBtn = document.querySelector('button[type="submit"]');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
  };

  const filterItems = (text) => {
    setFilterValue(text.toLowerCase());
  };

  const updateLocalStorage = (items) => {
    localStorage.setItem('items', JSON.stringify(items));
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filterValue)
  );

  return (
    <div className="container">
      <header>
        <img
          src="https://raw.githubusercontent.com/netmanoj/list/main/note.png"
          alt="Note"
        />
        <h1>Shopping List</h1>
      </header>
      <ItemForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        addItem={addItem}
      />
      <Filter filterValue={filterValue} filterItems={filterItems} />
      <ItemList
        items={filteredItems}
        removeItem={removeItem}
        setItemToEdit={setItemToEdit}
      />
      <button id="clear" className="btn-clear" onClick={clearItems}>
        Clear All
      </button>
    </div>
  );
}

export default ShoppingList;
