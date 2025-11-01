import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Aeronaves from "./pages/Aeronaves";
import Funcionarios from "./pages/Funcionarios";
import Pecas from "./pages/Pecas";
import Testes from "./pages/Testes";
import GerenciarEtapas from "./pages/GerenciarEtapas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aeronaves" element={<Aeronaves />} />
        <Route path="/funcionarios" element={<Funcionarios />}/>
        <Route path="/pecas" element={<Pecas />}/>
        <Route path="/testes" element={<Testes />}/>
        <Route path="/etapas" element={<GerenciarEtapas/>} />
      </Routes>
    </Router>
  );
}

export default App;
