import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import loadingsvg from "../../assets/animation/Animation - 1699081377345.json";
import "../../assets/css/menu.css";

function ItemMenu({
  loading,
  menuData,
  setCart,
  setCartCount,
  cart,
  cartCount,
}) {
  const [selectedCategory, setSelectedCategory] = useState(1);

  useEffect(() => {
    if (menuData && menuData.menu && menuData.menu.length > 0) {
      setSelectedCategory(menuData.menu[0].categoryId);
    }
  }, [menuData]);

  if (!menuData || !menuData.menu || !Array.isArray(menuData.menu)) {
    return <div>O menu está carregando ...</div>;
  }

  // Organize os itens por categoria
  const itemsByCategory = {};
  menuData.menu.forEach((item) => {
    if (!itemsByCategory[item.categoryId]) {
      itemsByCategory[item.categoryId] = [];
    }
    itemsByCategory[item.categoryId].push(item);
  });

  const addToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };

    const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
      setCart([...cart]);
      setCartCount(cartCount + 1);
    } else {
      setCart([...cart, cartItem]);
      setCartCount(cartCount + 1);
    }
  };

  function category(id) {
    switch (id) {
      case 1:
        return "Lanche";
      case 2:
        return "Refeição";
      case 3:
        return "Bebidas";
      case 4:
        return "Combos";
      default:
        return "Categoria Desconhecida";
    }
  }

  // Filtrar e ordenar os itens
  const sortedItems = menuData.menu
    .filter((item) => item.isVisible)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="row mt-4">
      {loading ? (
        <div className="loading-container">
          <div
            style={{
              width: "10%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Lottie animationData={loadingsvg} loop={true} />
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <Tabs
              activeKey={selectedCategory}
              id="category-tabs"
              onSelect={(key) => setSelectedCategory(key)}
              className="justify-content-center "
            >
              {Object.keys(itemsByCategory).map((categoryId) => (
                <Tab
                  eventKey={parseInt(categoryId)}
                  title={category(parseInt(categoryId))}
                  key={categoryId}
                >
                  {sortedItems
                    .filter((item) => item.categoryId === parseInt(categoryId))
                    .filter((item) => item.isVisible).length > 0 ? (
                    <div className="row mt-2">
                      {sortedItems
                        .filter(
                          (item) => item.categoryId === parseInt(categoryId)
                        )
                        .map((item) => (
                          <div key={item.id} className={`col-md-4 mb-1`}>
                            <div
                              className={`card bg ${
                                item.isVisible ? "" : "item-unavailable"
                              }`}
                            >
                              <div className="card-body">
                                <h5 className="card-title fs-5 fw-bold text-light">
                                  {item.name}
                                </h5>
                                <div className="card-text fs-5 fw-bold text-light max-height">
                                  {item.description}
                                </div>
                                <p className="card-text fs-5 fw-bold text-light">
                                  R${item.price.toFixed(2)}
                                </p>
                                <div className="d-flex justify-content-end">
                                  <button
                                    className={`btn btn-danger`}
                                    onClick={() => addToCart(item)}
                                    disabled={!item.isVisible}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <hr />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center mt-3">
                      <p>Itens Indisponíveis no Momento</p>
                    </div>
                  )}
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemMenu;
