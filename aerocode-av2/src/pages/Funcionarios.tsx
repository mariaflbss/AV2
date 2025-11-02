import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CadastrarFuncionario from "../components/CadastrarFuncionario";
import "../Funcionarios.css";

interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  permissao: string; 
}

const Funcionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    {
      id: "1",
      nome: "Maria Fernanda",
      telefone: "12345678900",
      endereco: "Rua A",
      usuario: "maria_admin",
      senha: "123456",
      permissao: "1",
    },
    {
      id: "2",
      nome: "Heloisa Cardillo",
      telefone: "11987654321",
      endereco: "Rua B",
      usuario: "heloisa_eng",
      senha: "789100",
      permissao: "2",
    },
    {
      id: "3",
      nome: "Laura Félix",
      telefone: "13249875601",
      endereco: "Rua C",
      usuario: "laura_op",
      senha: "246810",
      permissao: "3",
    },
  ]);

  const [pesquisa, setPesquisa] = useState("");
  const [selecionado, setSelecionado] = useState<Funcionario | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState<Funcionario | null>(null);

  const funcionariosFiltrados = funcionarios.filter(
    (f) =>
      f.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      f.usuario.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const handleCadastrar = (novoFuncionario: Funcionario) => {
    const existe = funcionarios.some(
      (f) => f.id === novoFuncionario.id || f.usuario === novoFuncionario.usuario
    );

    if (existe) {
      alert(
        `Funcionário com ID ${novoFuncionario.id} ou usuário ${novoFuncionario.usuario} já existe!`
      );
      return;
    }

    setFuncionarios([...funcionarios, novoFuncionario]);
  };

  const handleAtualizar = (funcAtualizado: Funcionario) => {
    setFuncionarios((prev) =>
      prev.map((f) => (f.id === funcAtualizado.id ? funcAtualizado : f))
    );
    setFuncionarioEditando(null);
    setIsModalOpen(false);
  };

  const handleExcluir = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      setFuncionarios((prev) => prev.filter((f) => f.id !== id));
      setSelecionado(null);
    }
  };

  return (
    <div className="funcionarios-container">
      <Sidebar />

      <main className="funcionarios-main">
        <h1>Gerenciamento de Funcionários</h1>

        <div className="funcionarios-actions">
          <input
            type="text"
            placeholder="Pesquisar funcionário..."
            className="funcionarios-search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button
            className="btn cadastrar"
            onClick={() => {
              setFuncionarioEditando(null);
              setIsModalOpen(true);
            }}
          >
            Cadastrar Funcionário
          </button>
        </div>

        <div className="funcionarios-list">
          {funcionariosFiltrados.length > 0 ? (
            funcionariosFiltrados.map((funcionario) => (
              <div
                key={funcionario.id}
                className="funcionario-card"
                onClick={() => setSelecionado(funcionario)}
              >
                <p className="funcionario-nome">{funcionario.nome}</p>
                <span className="funcionario-usuario">@{funcionario.usuario}</span>
              </div>
            ))
          ) : (
            <p className="sem-resultados">Nenhum funcionário encontrado</p>
          )}
        </div>

        {selecionado && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setSelecionado(null)}>
                &times;
              </span>
              <h2>{selecionado.nome}</h2>
              <p><strong>ID:</strong> {selecionado.id}</p>
              <p><strong>Usuário:</strong> {selecionado.usuario}</p>
              <p><strong>Telefone:</strong> {selecionado.telefone}</p>
              <p><strong>Endereço:</strong> {selecionado.endereco}</p>
              <p>
                <strong>Permissão:</strong>{" "}
                {selecionado.permissao === "1"
                  ? "Administrador"
                  : selecionado.permissao === "2"
                  ? "Engenheiro"
                  : "Operador"}
              </p>
              <div style={{ marginTop: "20px" }}>
                <button className="btn editar" onClick={() => {
                     setFuncionarioEditando(selecionado);
                    setIsModalOpen(true);
                    setSelecionado(null);
                  }} > Editar </button>
                <button className="btn excluir" onClick={() => handleExcluir(selecionado.id)}>Excluir</button>
              </div>
            </div>
          </div>
        )}

        <CadastrarFuncionario
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setFuncionarioEditando(null);
          }}
          onCadastrar={(func: Funcionario) => {
            if (funcionarioEditando) {
              handleAtualizar(func);
            } else {
              handleCadastrar(func);
            }
          }}
          funcionarioEditando={funcionarioEditando}
        />
      </main>
    </div>
  );
};

export default Funcionarios;