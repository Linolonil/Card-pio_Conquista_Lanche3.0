import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBarAdmin";
import AddNewItemForm from "./AddNewItemForm";
import CategoryList from "./CategoryList";
import SearchItem from "./SearchItem";

function AdminPanel() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  //rotas API
  const getItem = "https://bd-cl-2-0.onrender.com/itens/consultar-itens";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Se não houver um token válido, redirecione para a página de login.
      navigate("/login");
    } else {
      axios
        .get("https://bd-cl-2-0.onrender.com/rota-protegida", {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            setMessage(data.message);
          } else if (response.status === 401) {
            navigate("/login");
          }
        })
        .catch(() => {
          navigate("/login");
        });
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(getItem, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setMenuItems(response.data);
      });
  }, []);

  return (
    <div className="container-fluid">
      <NavBar message={message} />
      <hr className="my-5" />
      <h2 className="mt-5 text-center display-4 fw-bold ">Cardápio</h2>
      <AddNewItemForm
        message={message}
        menuItems={menuItems}
        setMenuItems={setMenuItems}
      />
      <SearchItem menuItems={menuItems} setMenuItems={setMenuItems} />

      <div className="row">
        <CategoryList
          title={"Lanches"}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          list={1}
        />
        <CategoryList
          title={"Refeições"}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          list={2}
        />
        <CategoryList
          title={"Bebidas"}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          list={3}
        />
        <CategoryList
          title={"Combos"}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          list={4}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminPanel;
