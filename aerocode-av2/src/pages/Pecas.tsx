import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CadastrarPeca from "../components/CadastrarPecas";
import "../Pecas.css";

interface Peca {
  nome: string;
  tipo: "nacional" | "importada";
  fornecedor: string;
  status: "em producao" | "em transporte" | "pronta para uso";
}

const Pecas: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>([
    { nome: "Turbina X-200", 
      tipo: "nacional", 
      fornecedor: "AeroBrasil", 
      status: "em producao" 
    },
    { nome: "Asa Delta-300", 
      tipo: "importada", 
      fornecedor: "SkyFly", 
      status: "em transporte" 
    },
    { nome: "Painel Digital A21", 
      tipo: "nacional", 
      fornecedor: "Airtech", 
      status: "pronta para uso" 
    },
  ]);

  const [pesquisa, setPesquisa] = useState("");
  const [isModalCadastrarOpen, setIsModalCadastrarOpen] = useState(false);
  const [pecaSelecionada, setPecaSelecionada] = useState<Peca | null>(null);
  const [pecaEditando, setPecaEditando] = useState<Peca | null>(null);

  const pecasFiltradas = pecas.filter((peca) =>
    peca.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const handleSalvar = (novaPeca: Peca) => {
    if (pecaEditando) {
      setPecas(pecas.map((p) => (p.nome === pecaEditando.nome ? novaPeca : p)));
      setPecaEditando(null);
    } else {
      const existe = pecas.some((p) => p.nome.toLowerCase() === novaPeca.nome.toLowerCase());
      if (existe) {
        alert(`Peça com nome ${novaPeca.nome} já existe!`);
        return;
      }
      setPecas([...pecas, novaPeca]);
    }
  };

  return (
    <div className="pecas-container">
      <Sidebar />

      <main className="pecas-main">
        <h1>Gerenciar Peças</h1>

        <div className="pecas-actions">
          <input
            type="text"
            placeholder="Pesquisar peça..."
            className="pecas-search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button
            className="btn cadastrar"
            onClick={() => setIsModalCadastrarOpen(true)}
          >
            Cadastrar Peça
          </button>
        </div>

        <div className="pecas-list">
          {pecasFiltradas.length > 0 ? (
            pecasFiltradas.map((peca, index) => (
              <div
                key={index}
                className="peca-card"
                onClick={() => setPecaSelecionada(peca)}
              >
                <p className="peca-nome">{peca.nome}</p>
                <p className="peca-status">{peca.status}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma peça encontrada</p>
          )}
        </div>

        {pecaSelecionada && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setPecaSelecionada(null)}>
                &times;
              </span>
              <h2>{pecaSelecionada.nome}</h2>
              <p><strong>Tipo:</strong> {pecaSelecionada.tipo}</p>
              <p><strong>Fornecedor:</strong> {pecaSelecionada.fornecedor}</p>
              <p><strong>Status:</strong> {pecaSelecionada.status}</p>
              <div className="modal-actions">
                <button
                  className="btn atualizar"
                  onClick={() => {
                    setPecaEditando(pecaSelecionada);
                    setPecaSelecionada(null);
                    setIsModalCadastrarOpen(true);
                  }}
                >
                  Atualizar
                </button>
                <button
                  className="btn cancelar"
                  onClick={() => setPecaSelecionada(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        <CadastrarPeca
          isOpen={isModalCadastrarOpen}
          onClose={() => {
            setIsModalCadastrarOpen(false);
            setPecaEditando(null);
          }}
          onSalvar={handleSalvar}
          pecasExistentes={pecas}
          pecaEditando={pecaEditando}
        />
      </main>
    </div>
  );
};

export default Pecas;
