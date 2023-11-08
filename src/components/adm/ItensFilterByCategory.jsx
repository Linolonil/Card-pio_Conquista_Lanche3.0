import React from "react";

function MenuItemList({ categoryTitle, items, toggleVisibility }) {
  return (
    <div>
      <h2>{categoryTitle}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - R$ {item.price}
            {item.isVisible ? " (Visível)" : " (Oculto)"}
            <button onClick={() => toggleVisibility(item.id, item.isVisible)}>
              Alternar Visibilidade
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuItemList;
