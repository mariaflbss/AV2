import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Login.css"; 

const PaginaLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@aerocode.com" && password === "123456") {
      alert("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      alert("E-mail ou senha inválidas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Entre</h2>
        <h4> Insira seu e-mail e senha</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
