import React, { useState } from "react";

interface Peca {
  nome: string;
  tipo: "nacional" | "importada";
  fornecedor: string;
  status: string;
}

interface Etapa {
  nome: string;
  prazo: string;
  status: string;
}

interface Teste {
  tipo: string;
  resultado: "aprovado" | "reprovado";
}

interface Aeronave {
  codigo: string;
  nome: string;
  modelo: string;
  tipo: string;
  capacidade: number;
  alcance: number;
  cliente: string;
  dataEntrega: string;
  imagem: string;
  pecas?: Peca[];
  etapas?: Etapa[];
  testes?: Teste[];
}

interface Relatorio {
  titulo: string;
  aeronave: Aeronave;
}

interface Props {
  aeronaves: Aeronave[];
  adicionarRelatorio: (relatorio: Relatorio) => void;
}

const GerarRelatorio: React.FC<Props> = ({ aeronaves, adicionarRelatorio }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState<Aeronave | null>(null);

  const gerar = () => {
    if (!titulo || !aeronaveSelecionada) return alert("Preencha título e selecione uma aeronave!");
    adicionarRelatorio({ titulo, aeronave: aeronaveSelecionada });
    setTitulo("");
    setAeronaveSelecionada(null);
    setModalAberto(false);
  };

  return (
    <>
      <button className="btn gerar" onClick={() => setModalAberto(true)}>
        Gerar Relatório
      </button>

      {modalAberto && (
        <div className="modal">
          <div className="modal-content">
            <h2>Gerar Relatório</h2>
            <label>Título do Relatório:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <label>Selecione a Aeronave:</label>
            <select
              value={aeronaveSelecionada?.codigo || ""}
              onChange={(e) => {
                const a = aeronaves.find(a => a.codigo === e.target.value);
                setAeronaveSelecionada(a || null);
              }}
            >
              <option value="">Selecione a Aeronave</option>
              {aeronaves.map(a => (
                <option key={a.codigo} value={a.codigo}>
                  {a.nome} ({a.codigo})
                </option>
              ))}
            </select>

            <div className="modal-buttons">
              <button className="btn confirmar" onClick={gerar}>Gerar</button>
              <button className="btn cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GerarRelatorio;
