import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/LoginPage";
import AdminPanel from "./components/adm/AdminPanel";
import Footer from "./components/footer/Footer";
import MenuCardapio from "./components/menu/MenuCardapio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/menu" element={<MenuCardapio />} />
        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children }) {
  // Verifique se o usuário está autenticado (por exemplo, com um token)
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver autenticado, permita o acesso à área de administração
  return children;
}

function AdminRoutes() {
  return (
    <RequireAuth>
      <AdminPanel />
      <Footer />
    </RequireAuth>
  );
}

export default App;
