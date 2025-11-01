import React, { useState } from "react";
import "../CadastrarFuncionario.css";

interface CadastrarFuncionarioProps {
  isOpen: boolean;
  onClose: () => void;
  onCadastrar: (novoFuncionario: any) => void;
}

const CadastrarFuncionario: React.FC<CadastrarFuncionarioProps> = ({
  isOpen,
  onClose,
  onCadastrar,
}) => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [permissao, setPermissao] = useState("3");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!id || !nome || !telefone || !endereco || !usuario || !senha) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const novoFuncionario = {
      id,
      nome,
      telefone,
      endereco,
      usuario,
      senha,
      permissao,
    };

    onCadastrar(novoFuncionario);
    onClose();

    setId("");
    setNome("");
    setTelefone("");
    setEndereco("");
    setUsuario("");
    setSenha("");
    setPermissao("3");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Cadastrar Funcionário</h2>

        <div className="modal-form">
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <select value={permissao} onChange={(e) => setPermissao(e.target.value)}>
            <option value="1">Administrador</option>
            <option value="2">Engenheiro</option>
            <option value="3">Operador</option>
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={handleSubmit} className="btn cadastrar">
            Cadastrar
          </button>
          <button onClick={onClose} className="btn cancelar">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadastrarFuncionario;
