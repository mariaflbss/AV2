import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Login.css"; 

const PaginaLogin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (user === "admin_aerocode" && password === "123456") {
      alert("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      alert("Nome de usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Entre</h2>
        <h4> Insira seu nome de usuário e senha</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="user"
            placeholder="Nome de usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default PaginaLogin;
