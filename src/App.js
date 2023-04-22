import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    const name = prompt("Enter product name:");
    const date = prompt("Enter use-by date (YYYY-MM-DD):");
    setItems([...items, { name, date }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSortItems = () => {
    const sortedItems = [...items].sort((a, b) => a.date.localeCompare(b.date));
    setItems(sortedItems);
  };

  return (
    <div>
      <h1>Food Shopping Products</h1>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleSortItems}>Sort by Use-By Date</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.date}
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
