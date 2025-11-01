import React, { useState } from "react";

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCadastrar: (etapa: Etapa, codigoAeronave: string) => void;
  aeronaves: Aeronave[];
}

const CadastrarEtapa: React.FC<Props> = ({ isOpen, onClose, onCadastrar, aeronaves }) => {
  const [nome, setNome] = useState("");
  const [prazo, setPrazo] = useState("");
  const [ordem, setOrdem] = useState(1);
  const [codigoAeronave, setCodigoAeronave] = useState(aeronaves[0]?.codigo || "");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!nome || !prazo || !codigoAeronave) {
      setErro("Preencha todos os campos!");
      return;
    }

    onCadastrar(
      { nome, prazo, ordem, status: "pendente", funcionarios: [] },
      codigoAeronave
    );

    // Limpa os campos
    setNome("");
    setPrazo("");
    setOrdem(1);
    setCodigoAeronave(aeronaves[0]?.codigo || "");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Cadastrar Etapa</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome da Etapa:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Montagem das asas"
            />
          </label>
          <label>
            Prazo:
            <input
              type="date"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
            />
          </label>
          <label>
            Ordem da Etapa:
            <input
              type="number"
              min={1}
              value={ordem}
              onChange={(e) => setOrdem(Number(e.target.value))}
            />
          </label>
          <label>
            Aeronave:
            <select
              value={codigoAeronave}
              onChange={(e) => setCodigoAeronave(e.target.value)}
            >
              {aeronaves.map((a) => (
                <option key={a.codigo} value={a.codigo}>
                  {a.codigo} - {a.nome}
                </option>
              ))}
            </select>
          </label>
          {erro && <p className="erro">{erro}</p>}
          <button type="submit" className="btn cadastrar">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarEtapa;
