import React, { useEffect, useState } from "react";
import "../Pecas.css";

interface Peca {
  nome: string;
  tipo: "nacional" | "importada";
  fornecedor: string;
  status: "em producao" | "em transporte" | "pronta para uso";
}

interface CadastrarPecaProps {
  isOpen: boolean;
  onClose: () => void;
  onSalvar: (novaPeca: Peca) => void;
  pecasExistentes: Peca[];
  pecaEditando?: Peca | null;
}

const CadastrarPeca: React.FC<CadastrarPecaProps> = ({
  isOpen,
  onClose,
  onSalvar,
  pecasExistentes,
  pecaEditando,
}) => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"nacional" | "importada">("nacional");
  const [fornecedor, setFornecedor] = useState("");
  const [status, setStatus] = useState<"em producao" | "em transporte" | "pronta para uso">("em producao");

  useEffect(() => {
    if (pecaEditando) {
      setNome(pecaEditando.nome);
      setTipo(pecaEditando.tipo);
      setFornecedor(pecaEditando.fornecedor);
      setStatus(pecaEditando.status);
    } else {
      setNome("");
      setTipo("");
      setFornecedor("");
      setStatus("");
    }
  }, [pecaEditando]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existe = pecasExistentes.some(
      (p) => p.nome.toLowerCase() === nome.toLowerCase() && p.nome !== pecaEditando?.nome
    );
    if (existe) {
      alert(`Peça com nome ${nome} já existe!`);
      return;
    }

    onSalvar({ nome, tipo, fornecedor, status });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{pecaEditando ? "Atualizar Peça" : "Cadastrar Peça"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            disabled={!!pecaEditando}
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
            <option value="" disabled>Selecione o tipo de peça</option> 
            <option value="nacional">Nacional</option>
            <option value="importada">Importada</option>
          </select>
          <input
            type="text"
            placeholder="Fornecedor"
            value={fornecedor}
            onChange={(e) => setFornecedor(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="" disabled>Selecione o status da peça</option> 
            <option value="em producao">Em produção</option>
            <option value="em transporte">Em transporte</option>
            <option value="pronta para uso">Pronta para uso</option>
          </select>
          <div className="modal-actions">
            <button type="submit" className="btn cadastrar">
              {pecaEditando ? "Salvar Alterações" : "Cadastrar"}
            </button>
            <button type="button" className="btn cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarPeca;
