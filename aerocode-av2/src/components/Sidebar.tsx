import React from "react";
import { Link } from "react-router-dom";
import "../Sidebar.css";

export const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/aeronaves">Gerenciamento de Aeronaves</Link></li>
        <li><Link to="/funcionarios">Gerenciamento de Funcionários</Link></li>
        <li><Link to="/pecas">Gerenciamento de Peças</Link></li>
        <li><Link to="/relatorios">Relatórios</Link></li>
        <li><Link to="/testes">Testes</Link></li>
        <li><Link to="/login">Sair</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;