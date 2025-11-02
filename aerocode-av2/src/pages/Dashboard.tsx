import React from "react";
import Sidebar from "../components/Sidebar";
import "../Dashboard.css";

interface DashboardCard {
  title: string;
  value: number | string;
  description: string;
  icon: string; 
}

const mockData: DashboardCard[] = [
  { title: "Aeronaves", value: 12, description: "Aeronaves cadastradas", icon: "/imgAeronaves.png" },
  { title: "Funcionários", value: 25, description: "Funcionários ativos", icon: "/imgFuncionarios.png" },
  { title: "Peças", value: 40, description: "Peças cadastradas", icon: "/imgPecas.png" },
  { title: "Testes", value: 18, description: "Testes realizados", icon: "/imgTestes.png" },
  { title: "Relatórios", value: 7, description: "Relatórios gerados", icon: "/imgRelatorio.png" },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <h1>Bem-vindo ao Dashboard</h1>

        <div className="dashboard-content">
          {mockData.map((item, index) => (
            <div key={index} className="dashboard-card">
              <div className="dashboard-card-icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
              <small>{item.description}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
