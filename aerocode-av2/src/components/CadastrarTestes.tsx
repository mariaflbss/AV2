import React, { useState } from "react";
import "../CadastrarFuncionario.css"; 

interface CadastrarTesteProps {
  isOpen: boolean;
  onClose: () => void;
  onCadastrar: (novoTeste: any) => void;
}

const CadastrarTeste: React.FC<CadastrarTesteProps> = ({
  isOpen,
  onClose,
  onCadastrar,
}) => {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState<"eletrico" | "hidraulico" | "aerodinamico">("");
  const [resultado, setResultado] = useState<"aprovado" | "reprovado">("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!id || !titulo || !descricao || !data) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const novoTeste = {
      id,
      nome: titulo,
      descricao,
      dataCriacao: data,
      tipo,
      resultado,
    };

    onCadastrar(novoTeste);
    onClose();

    setId("");
    setTitulo("");
    setDescricao("");
    setData("");
    setTipo("");
    setResultado("");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Cadastrar Teste</h2>

        <div className="modal-form">
          <input
            type="text"
            placeholder="ID do teste"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Título do teste"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
            <option value="" disabled>Selecione o tipo de teste</option> 
            <option value="eletrico">Elétrico</option>
            <option value="hidraulico">Hidráulico</option>
            <option value="aerodinamico">Aerodinâmico</option>
          </select>
          <select value={resultado} onChange={(e) => setResultado(e.target.value as any)}>
            <option value="" disabled>Selecione o status do teste</option> 
            <option value="aprovado">Aprovado</option>
            <option value="reprovado">Reprovado</option>
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={handleSubmit} className="btn cadastrar">Cadastrar</button>
          <button onClick={onClose} className="btn cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CadastrarTeste;
