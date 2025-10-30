import React from "react";
import Sidebar from "../components/Sidebar"; 
import "../Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <h1>Bem-vindo ao Dashboard</h1>

        <div className="dashboard-content">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="dashboard-card">
              <h3>Container {i + 1}</h3>
              <p>Conteúdo do container {i + 1}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;