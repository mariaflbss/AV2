import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Sidebar.css";
import type { NivelUsuario } from "../utils/permissoes";
import { podeAcessar } from "../utils/permissoes";

interface MenuItem {
  label: string;
  path: string;
  key: string;
  icon: string; 
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", key: "dashboard", icon: "/imgDashboard.png" },
  { label: "Gerenciar Aeronaves", path: "/aeronaves", key: "aeronaves", icon: "/imgAeronaves.png" },
  { label: "Gerenciar Funcionários", path: "/funcionarios", key: "funcionarios", icon: "/imgFuncionarios.png" },
  { label: "Gerenciar Peças", path: "/pecas", key: "pecas", icon: "/imgPecas.png" },
  { label: "Gerenciar Testes", path: "/testes", key: "testes", icon: "/imgTestes.png" },
  { label: "Relatórios", path: "/relatorios", key: "relatorios", icon: "/imgRelatorio.png" },
];

const SideBar: React.FC = () => {
  const [active, setActive] = useState("dashboard");
  const [nivelUsuario, setNivelUsuario] = useState<NivelUsuario | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Pega o nível do usuário do localStorage
  useEffect(() => {
    const nivel = localStorage.getItem("nivelUsuario") as NivelUsuario | null;
    setNivelUsuario(nivel ?? null);
  }, []);

  // Atualiza o item ativo
  useEffect(() => {
    const path = location.pathname;
    const current = menuItems.find((item) => path.includes(item.key));
    if (current) setActive(current.key);
  }, [location]);

  const handleNavigation = (path: string, key: string) => {
    setActive(key);
    navigate(path);
  };

  // Filtra os itens visíveis de acordo com o nível do usuário
  const itensVisiveis = menuItems.filter(item => nivelUsuario ? podeAcessar(nivelUsuario, item.label) : false);

  return (
    <aside className="sidebar">
      <div className="perfil">
        <img src="/imgUsuario.png" alt="Perfil" className="perfil-img" />
        <div className="perfil-info">
          <h3>Usuário</h3>
          <p>Cargo</p>
        </div>
        <img
          src="/imgSair.png"
          alt="Sair"
          className="logout-icon"
          onClick={() => navigate("/")}
        />
      </div>

      <nav className="menu">
        {itensVisiveis.map((item) => (
          <button
            key={item.key}
            className={`menu-item ${active === item.key ? "active" : ""}`}
            onClick={() => handleNavigation(item.path, item.key)}
          >
            <img src={item.icon} alt={item.label} className="menu-icon" />
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
