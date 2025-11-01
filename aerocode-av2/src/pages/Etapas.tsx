import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CadastrarEtapa from "../components/CadastrarEtapa";
import "../Etapas.css";

interface Etapa {
  nome: string;
  prazo: string;
  ordem: number;
  status: "pendente" | "em andamento" | "finalizada";
  funcionarios: string[];
}

interface Aeronave {
  codigo: string;
  nome: string;
  etapas: Etapa[];
}

const EtapasProducao: React.FC = () => {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([
    {
      codigo: "1234",
      nome: "Aeronave MC 21 300",
      etapas: [
        { nome: "Etapa 1", prazo: "2025-11-11", ordem: 1, status: "pendente", funcionarios: [] },
      ],
    },
    {
      codigo: "5678",
      nome: "Aeronave AIRBUS A320",
      etapas: [],
    },
  ]);

  const [pesquisa, setPesquisa] = useState("");
  const [etapaSelecionada, setEtapaSelecionada] = useState<Etapa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtra aeronaves pelo nome ou código
  const aeronavesFiltradas = aeronaves.filter((a) =>
    a.nome.toLowerCase().includes(pesquisa.toLowerCase()) || a.codigo.includes(pesquisa)
  );

  // Cadastrar nova etapa
  const handleCadastrarEtapa = (etapa: Etapa, codigoAeronave: string) => {
    setAeronaves((prev) =>
      prev.map((a) =>
        a.codigo === codigoAeronave
          ? { ...a, etapas: [...a.etapas, etapa] }
          : a
      )
    );
  };

  // Iniciar etapa
  const handleIniciarEtapa = (codigoAeronave: string, nomeEtapa: string) => {
    setAeronaves((prev) =>
      prev.map((a) => {
        if (a.codigo !== codigoAeronave) return a;

        const etapasAtualizadas = a.etapas.map((etapa) => {
          if (etapa.nome !== nomeEtapa) return etapa;
          if (etapa.status === "pendente") {
            return { ...etapa, status: "em andamento" };
          } else {
            window.alert(`A etapa "${etapa.nome}" não pode ser iniciada.`);
            return etapa;
          }
        });

        return { ...a, etapas: etapasAtualizadas };
      })
    );
  };

  // Finalizar etapa
  const handleFinalizarEtapa = (codigoAeronave: string, nomeEtapa: string) => {
    setAeronaves((prev) =>
      prev.map((a) => {
        if (a.codigo !== codigoAeronave) return a;

        const etapasAtualizadas = a.etapas.map((etapa) => {
          if (etapa.nome !== nomeEtapa) return etapa;
          if (etapa.status === "em andamento") {
            return { ...etapa, status: "finalizada" };
          } else {
            window.alert(`A etapa "${etapa.nome}" não pode ser finalizada.`);
            return etapa;
          }
        });

        return { ...a, etapas: etapasAtualizadas };
      })
    );
  };

  return (
    <div className="etapas-container">
      <Sidebar />

      <main className="etapas-main">
        <h1>Gerenciamento de Etapas de Produção</h1>

        <div className="etapas-actions">
          <input
            type="text"
            placeholder="Pesquisar aeronave ou código..."
            className="etapas-search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button className="btn cadastrar" onClick={() => setIsModalOpen(true)}>
            Cadastrar Etapa
          </button>
        </div>

        <div className="etapas-list">
          {aeronavesFiltradas.length > 0 ? (
            aeronavesFiltradas.map((aeronave) => (
              <div key={aeronave.codigo} className="aeronave-card">
                <h3 className="aeronave-nome">
                  {aeronave.nome} ({aeronave.codigo})
                </h3>

                {aeronave.etapas.length > 0 ? (
                  <ul>
                    {aeronave.etapas.map((etapa, idx) => (
                      <li
                        key={idx}
                        className={`etapa-item status-${etapa.status}`}
                        onClick={() => setEtapaSelecionada(etapa)}
                      >
                        {etapa.ordem}. {etapa.nome} | Prazo:{" "}
                        {new Date(etapa.prazo).toLocaleDateString()} |{" "}
                        <strong>{etapa.status}</strong>
                        <div className="etapa-buttons">
                          <button
                            className="btn iniciar"
                            disabled={etapa.status !== "pendente"}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIniciarEtapa(aeronave.codigo, etapa.nome);
                            }}
                          >
                            Iniciar
                          </button>
                          <button
                            className="btn finalizar"
                            disabled={etapa.status !== "em andamento"}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFinalizarEtapa(aeronave.codigo, etapa.nome);
                            }}
                          >
                            Finalizar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhuma etapa cadastrada</p>
                )}
              </div>
            ))
          ) : (
            <p className="sem-resultados">Nenhuma aeronave encontrada</p>
          )}
        </div>

        {/* Modal de detalhes da etapa */}
        {etapaSelecionada && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setEtapaSelecionada(null)}>
                &times;
              </span>
              <h2>{etapaSelecionada.nome}</h2>
              <p><strong>Prazo:</strong> {new Date(etapaSelecionada.prazo).toLocaleDateString()}</p>
              <p><strong>Ordem:</strong> {etapaSelecionada.ordem}</p>
              <p><strong>Status:</strong> {etapaSelecionada.status}</p>
              <p><strong>Funcionários:</strong> {etapaSelecionada.funcionarios.join(", ") || "Nenhum"}</p>
            </div>
          </div>
        )}

        {/* Modal de cadastro */}
        <CadastrarEtapa
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCadastrar={handleCadastrarEtapa}
          aeronaves={aeronaves}
        />
      </main>
    </div>
  );
};

export default EtapasProducao;
