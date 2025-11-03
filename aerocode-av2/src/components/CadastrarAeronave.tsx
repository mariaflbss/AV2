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
  const [tipo, setTipo] = useState("");
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

  const fileParaBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
 
  const handleSubmit = async () => {
    if (!codigo || !modelo || !tipo || !capacidade || !alcance || !cliente || !dataEntrega) {
      alert("Preencha todos os campos!");
      return;
    }
 
    let imagemBase64 = preview;
    if (imagem) {
      imagemBase64 = await fileParaBase64(imagem);
    }
 
    const novaAeronave = {
      codigo,
      nome: modelo,
      modelo,
      tipo,
      capacidade: Number(capacidade),
      alcance: Number(alcance),
      cliente,
      dataEntrega,
      imagem: imagemBase64,
    };
 
    onCadastrar(novaAeronave);
    onClose();
    
    setCodigo(""); setModelo(""); setTipo(""); setCapacidade("");
    setAlcance(""); setCliente(""); setDataEntrega(""); setImagem(null); setPreview("");
  };
 
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Cadastrar Nova Aeronave</h2>
        <div className="modal-form">
          <input type="text" placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
          <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="" disabled>Selecione o tipo de aeronave</option> 
            <option value="militar">Militar</option>
            <option value="comercial">Comercial</option>
          </select>
          <input type="number" placeholder="Capacidade" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} />
          <input type="number" placeholder="Alcance" value={alcance} onChange={(e) => setAlcance(e.target.value)} />
          <input type="text" placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
          <input type="date" placeholder="Data de Entrega" value={dataEntrega} onChange={(e) => setDataEntrega(e.target.value)} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" style={{ width: "150px", marginTop: "10px" }} />}
        </div>
        <div className="modal-actions">
          <button className="btn cadastrar" onClick={handleSubmit}>Cadastrar</button>
          <button className="btn cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
 
export default CadastrarAeronave;