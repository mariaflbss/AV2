import React, { useState } from "react";
import "../Aeronaves.css";

interface CadastrarAeronaveProps {
  isOpen: boolean;
  onClose: () => void;
  onCadastrar: (novaAeronave: any) => void;
}

const CadastrarAeronave: React.FC<CadastrarAeronaveProps> = ({
  isOpen,
  onClose,
  onCadastrar,
}) => {
  const [codigo, setCodigo] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("militar");
  const [capacidade, setCapacidade] = useState("");
  const [alcance, setAlcance] = useState("");
  const [cliente, setCliente] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0])); 
    }
  };

  const handleSubmit = () => {
    const novaAeronave = {
      codigo,
      nome: modelo,
      modelo,
      tipo,
      capacidade,
      alcance,
      cliente,
      dataEntrega,
      imagem: preview || "aeronave1.jpg", // usa preview se selecionou
    };
    onCadastrar(novaAeronave);
    onClose();
    // resetar campos
    setCodigo("");
    setModelo("");
    setTipo("militar");
    setCapacidade("");
    setAlcance("");
    setCliente("");
    setDataEntrega("");
    setImagem(null);
    setPreview("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Cadastrar Nova Aeronave</h2>
        <div className="modal-form">
          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="militar">Militar</option>
            <option value="comercial">Comercial</option>
          </select>
          <input
            type="number"
            placeholder="Capacidade"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
          />
          <input
            type="number"
            placeholder="Alcance"
            value={alcance}
            onChange={(e) => setAlcance(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data de Entrega"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "150px", marginTop: "10px" }}
            />
          )}
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

export default CadastrarAeronave;
