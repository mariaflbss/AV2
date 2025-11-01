import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CadastrarTeste from "../components/CadastrarTestes";
import "../Funcionarios.css"; // pode renomear depois para "Testes.css"

interface Teste {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: string;
  tipo: "eletrico" | "hidraulico" | "aerodinamico";
  resultado: "aprovado" | "reprovado";
}

const Testes: React.FC = () => {
  const [testes, setTestes] = useState<Teste[]>([
    {
      id: "1",
      nome: "Teste A",
      descricao: "Teste da Aeronave MC 21 300",
      dataCriacao: "2025-11-01",
      tipo: "aerodinamico",
      resultado: "aprovado",
    },
    {
      id: "2",
      nome: "Teste B",
      descricao: "Teste da Aeronave MC 21 301",
      dataCriacao: "2025-11-02",
      tipo: "eletrico",
      resultado: "reprovado",
    },
  ]);

  const [pesquisa, setPesquisa] = useState("");
  const [selecionado, setSelecionado] = useState<Teste | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const testesFiltrados = testes.filter((t) =>
    t.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const handleCadastrar = (novoTeste: Teste) => {
    const existe = testes.some(
      (t) => t.id === novoTeste.id || t.nome === novoTeste.nome
    );
    if (existe) {
      alert(`Teste com ID ${novoTeste.id} ou nome ${novoTeste.nome} já existe!`);
      return;
    }
    setTestes([...testes, novoTeste]);
  };

  return (
    <div className="funcionarios-container">
      <Sidebar />

      <main className="funcionarios-main">
        <h1>Gerenciar Testes</h1>

        <div className="funcionarios-actions">
          <input
            type="text"
            placeholder="Pesquisar teste..."
            className="funcionarios-search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button className="btn cadastrar" onClick={() => setIsModalOpen(true)}>
            Cadastrar Teste
          </button>
        </div>

        <div className="funcionarios-list">
          {testesFiltrados.length > 0 ? (
            testesFiltrados.map((teste) => (
              <div
                key={teste.id}
                className="funcionario-card"
                onClick={() => setSelecionado(teste)}
              >
                <p className="funcionario-nome">{teste.nome}</p>
                <span className="funcionario-usuario">{teste.resultado}</span>
              </div>
            ))
          ) : (
            <p className="sem-resultados">Nenhum teste encontrado</p>
          )}
        </div>

        {/* Modal de visualização do teste */}
        {selecionado && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setSelecionado(null)}>
                &times;
              </span>
              <h2>{selecionado.nome}</h2>
              <p><strong>ID:</strong> {selecionado.id}</p>
              <p><strong>Descrição:</strong> {selecionado.descricao}</p>
              <p><strong>Data de Criação:</strong> {selecionado.dataCriacao}</p>
              <p><strong>Tipo:</strong> {selecionado.tipo}</p>
              <p><strong>Resultado:</strong> {selecionado.resultado}</p>
            </div>
          </div>
        )}

        <CadastrarTeste
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCadastrar={handleCadastrar}
        />
      </main>
    </div>
  );
};

export default Testes;
