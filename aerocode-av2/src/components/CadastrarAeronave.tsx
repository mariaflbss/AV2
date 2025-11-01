import React, { useState } from "react";
import "../CadastrarAeronave.css";

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
    if (
      !codigo.trim() ||
      !modelo.trim() ||
      !tipo.trim() ||
      !capacidade.trim() ||
      !alcance.trim() ||
      !cliente.trim() ||
      !dataEntrega.trim()
    ) {
      alert("Por favor, preencha todos os campos obrigatórios antes de cadastrar.");
      return;
    }

    const novaAeronave = {
      codigo,
      nome: modelo,
      modelo,
      tipo,
      capacidade,
      alcance,
      cliente,
      dataEntrega,
      imagem: preview || "aeronave1.jpg", 
    };

    onCadastrar(novaAeronave);
    onClose();
    
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
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Cadastrar Nova Aeronave</h2>

        <div className="modal-form">
          <input
            type="text"
            placeholder="Código*"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Modelo*"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="militar">Militar</option>
            <option value="comercial">Comercial</option>
          </select>
          <input
            type="number"
            placeholder="Capacidade*"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Alcance (km)*"
            value={alcance}
            onChange={(e) => setAlcance(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cliente*"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Data de Entrega*"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
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
