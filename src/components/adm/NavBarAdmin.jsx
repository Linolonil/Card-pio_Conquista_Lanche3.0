import logo from "../../assets/logo-min.png";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ message }) => {
  const navigate = useNavigate();

  function getWelcomeMessage(username) {
    if (username === "cleideConquistaLanche!") {
      return "Seja bem-vinda, Maria Cleide!";
    } else if (username === "veronicaConquistaLanche!") {
      return "Seja bem-vinda, Veronica!";
    } else {
      return "Bem-vindo!";
    }
  }

  const handleLogout = () => {
    // Remova o token do localStorage ou cookies
    localStorage.removeItem("token");

    // Redirecione o usuário de volta para a página de login
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="d-flex justify-content-center">
            <Link to="/admin" className="navbar-brand">
              <img
                src={logo}
                alt="Imagem Responsiva"
                className="img-fluid"
                style={{ maxWidth: "10rem" }}
              />
            </Link>
          </div>

          <p className="navbar-text alert alert-primary mt-4">
            {getWelcomeMessage(message)}
          </p>

          <button className="btn btn-danger" onClick={handleLogout}>
            Encerrar Sessão
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
