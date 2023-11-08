import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import logo from "../../assets/logo-min.png";
import "../../assets/css/menu.css";

import ItemMenu from "./ItemMenu";
import ModalCart from "./ModalCart";

function MenuCardapio() {
  const [showModal, setShowModal] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const getItem = "https://bd-cl-2-0.onrender.com/menu";

  useEffect(() => {
    axios
      .get(getItem)
      .then((response) => {
        setMenuData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar itens do menu:", error);
        setLoading(false);
      });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow  d-flex justify-content-around"
        style={{ zIndex: 100 }}
      >
        <img
          src={logo}
          alt="Imagem Responsiva"
          className="img-fluid"
          style={{ maxWidth: "4rem" }}
        />
        <h5 className="navbar-brand">Cardápio Conquista</h5>
        <Button
          className="bg-danger border-danger shadow"
          onClick={openModal}
          style={{ position: "relative", maxWidth: "4rem" }}
        >
          <FontAwesomeIcon icon={faCartShopping} style={{ color: "#000000" }} />
          <span
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              transform: "translate(50%, -50%)",
              backgroundColor: "white",
              color: "black",
              borderRadius: "50%",
              padding: "1px 7px",
              fontSize: "12px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            {cartCount}
          </span>
        </Button>
      </nav>

      <ItemMenu
        {...{ loading, menuData, setCart, setCartCount, cart, cartCount }}
      />
      <ModalCart
        {...{ cart, cartCount, setCart, setCartCount, showModal, setShowModal }}
      />
    </div>
  );
}

export default MenuCardapio;
