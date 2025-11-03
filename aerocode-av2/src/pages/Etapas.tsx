import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CadastrarEtapa from "../components/CadastrarEtapa";
import "../Etapas.css";
import { salvarDados, carregarDados } from "../utils/storage";
 
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
  modelo?: string;
  tipo?: string;
  capacidade?: number;
  alcance?: number;
  cliente?: string;
  dataEntrega?: string;
  imagem?: string;
  etapas?: Etapa[];
}
 
interface Funcionario {
  id: string;
  nome: string;
  telefone?: string;
  endereco?: string;
  usuario?: string;
  senha?: string;
  permissao?: string;
}
 
type EtapaSelecionada = Etapa & { aeronaveNome?: string };
 
const EtapasProducao: React.FC = () => {
const navigate = useNavigate();
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [funcionarios] = useState<Funcionario[]>([
    { id: "1", nome: "Maria Fernanda", telefone: "123", endereco: "Rua A", usuario: "maria_admin", senha: "123456", permissao: "1" },
    { id: "2", nome: "Heloisa Cardillo", telefone: "456", endereco: "Rua B", usuario: "heloisa_eng", senha: "789100", permissao: "2" },
    { id: "3", nome: "Laura Félix", telefone: "789", endereco: "Rua C", usuario: "laura_op", senha: "246810", permissao: "3" },
  ]);
 
  const [pesquisa, setPesquisa] = useState("");
  const [etapaSelecionada, setEtapaSelecionada] = useState<EtapaSelecionada | null>(null);
  const [isModalEtapaOpen, setIsModalEtapaOpen] = useState(false);
  const [isModalAssocOpen, setIsModalAssocOpen] = useState(false);
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState<string>("");
  const [etapaAssoc, setEtapaAssoc] = useState<string>("");
  const [funcionarioAssoc, setFuncionarioAssoc] = useState<string>("");


  useEffect(() => {
    const salvas = carregarDados<Aeronave[]>("aeronaves");
    if (salvas.length > 0) setAeronaves(salvas);
    else setAeronaves([]); 
  }, []);
 
  const aeronavesFiltradas = aeronaves.filter(
    (a) => a.nome.toLowerCase().includes(pesquisa.toLowerCase()) || a.codigo.includes(pesquisa)
  );
 
  const handleCadastrarEtapa = (etapa: Etapa, codigoAeronave: string) => {
    setAeronaves((prev) => {
      const atualizadas = prev.map((a) =>
        a.codigo === codigoAeronave ? { ...a, etapas: [...(a.etapas || []), etapa] } : a
      );
      salvarDados("aeronaves", atualizadas);
      return atualizadas;
    });
  };
 
  const handleIniciarEtapa = (aeronaveCodigo: string, etapaNome: string) => {
    setAeronaves((prev) => {
      const atualizadas = prev.map((a) =>
        a.codigo === aeronaveCodigo
          ? {
              ...a,
              etapas: (a.etapas || []).map((e) =>
                e.nome === etapaNome && e.status === "pendente" ? { ...e, status: "em andamento" } : e
              ),
            }
          : a
      );
      salvarDados("aeronaves", atualizadas);
      return atualizadas;
    });
  };
 
  const handleFinalizarEtapa = (aeronaveCodigo: string, etapaNome: string) => {
    setAeronaves((prev) => {
      const atualizadas = prev.map((a) =>
        a.codigo === aeronaveCodigo
          ? {
              ...a,
              etapas: (a.etapas || []).map((e) =>
                e.nome === etapaNome && e.status === "em andamento" ? { ...e, status: "finalizada" } : e
              ),
            }
          : a
      );
      salvarDados("aeronaves", atualizadas);
      return atualizadas;
    });
  };
 
  const handleAssociarFuncionario = () => {
    if (!aeronaveSelecionada || !etapaAssoc || !funcionarioAssoc) return alert("Preencha todos os campos.");
    setAeronaves((prev) => {
      const atualizadas = prev.map((a) =>
        a.codigo === aeronaveSelecionada
          ? {
              ...a,
              etapas: (a.etapas || []).map((e) =>
                e.nome === etapaAssoc
                  ? {
                      ...e,
                      funcionarios: e.funcionarios.includes(funcionarioAssoc)
                        ? e.funcionarios
                        : [...e.funcionarios, funcionarioAssoc],
                    }
                  : e
              ),
            }
          : a
      );
      salvarDados("aeronaves", atualizadas);
      return atualizadas;
    });
    setAeronaveSelecionada("");
    setEtapaAssoc("");
    setFuncionarioAssoc("");
    setIsModalAssocOpen(false);
  };

  return (
    <div className="etapas-container">
      <Sidebar />
      <main className="etapas-main">
            <button className="btn voltar" onClick={() =>  navigate("/aeronaves")}>
              ← Voltar
            </button>
        <h1>Gerenciamento de Etapas de Produção</h1>
 
        <div className="etapas-actions">
          <input
            type="text"
            placeholder="Pesquisar aeronave ou código..."
            className="etapas-search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button className="btn cadastrar" onClick={() => setIsModalEtapaOpen(true)}>Cadastrar Etapa</button>
          <button className="btn associar" onClick={() => setIsModalAssocOpen(true)}>Associar Funcionário</button>
        </div>
 
        <div className="etapas-container">
          {aeronavesFiltradas.map((aeronave) => (
            <div key={aeronave.codigo} className="aeronave-card">
              <h3>{aeronave.nome}</h3>
              <div className="etapas-grid">
                {(aeronave.etapas || []).length > 0 ? (
                  aeronave.etapas!.map((etapa) => (
                    <div key={etapa.nome} className="etapa-card">
                      <div
                        className="etapa-info"
                        onClick={() => setEtapaSelecionada({ ...etapa, aeronaveNome: aeronave.nome })}
                      >
                        <h4>{etapa.nome}</h4>
                        <p className={`status ${etapa.status}`}>{etapa.status}</p>
                      </div>
                      <div className="etapa-buttons">
                        <button onClick={() => handleIniciarEtapa(aeronave.codigo, etapa.nome)} disabled={etapa.status !== "pendente"}>Iniciar</button>
                        <button onClick={() => handleFinalizarEtapa(aeronave.codigo, etapa.nome)} disabled={etapa.status !== "em andamento"}>Finalizar</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhuma etapa cadastrada</p>
                )}
              </div>
            </div>
          ))}
        </div>
 
        {etapaSelecionada && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setEtapaSelecionada(null)}>&times;</span>
              <h2>{etapaSelecionada.nome}</h2>
              <p><strong>Aeronave:</strong> {etapaSelecionada.aeronaveNome}</p>
              <p><strong>Prazo:</strong> {etapaSelecionada.prazo}</p>
              <p><strong>Ordem:</strong> {etapaSelecionada.ordem}</p>
              <p><strong>Status:</strong> {etapaSelecionada.status}</p>
              <p><strong>Funcionários:</strong> {etapaSelecionada.funcionarios.length > 0 ? etapaSelecionada.funcionarios.join(", ") : "Nenhum"}</p>
            </div>
          </div>
        )}
 
        <CadastrarEtapa isOpen={isModalEtapaOpen} onClose={() => setIsModalEtapaOpen(false)} onCadastrar={handleCadastrarEtapa} aeronaves={aeronaves} />
 
        {isModalAssocOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalAssocOpen(false)}>&times;</span>
              <h2>Associar Funcionário a Etapa</h2>
              <label>
                Aeronave:
                <select value={aeronaveSelecionada} onChange={(e) => setAeronaveSelecionada(e.target.value)}>
                  <option value="">Selecione a Aeronave</option>
                  {aeronaves.map((a) => <option key={a.codigo} value={a.codigo}>{a.nome} ({a.codigo})</option>)}
                </select>
              </label>
              {aeronaveSelecionada && (
                <label>
                  Etapa:
                  <select value={etapaAssoc} onChange={(e) => setEtapaAssoc(e.target.value)}>
                    <option value="">Selecione</option>
                    {aeronaves.find((a) => a.codigo === aeronaveSelecionada)?.etapas?.map((et) => (
                      <option key={et.nome} value={et.nome}>{et.nome}</option>
                    ))}
                  </select>
                </label>
              )}
              <label>
                Funcionário:
                <select value={funcionarioAssoc} onChange={(e) => setFuncionarioAssoc(e.target.value)}>
                  <option value="">Selecione o(a) Funcionário(a)</option>
                  {funcionarios.map((f) => <option key={f.id} value={f.nome}>{f.nome}</option>)}
                </select>
              </label>
              <button className="btn cadastrar" onClick={handleAssociarFuncionario}>Associar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
 
export default EtapasProducao;