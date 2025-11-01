import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CadastrarAeronave from "../components/CadastrarAeronave"; 
import "../Aeronaves.css";

interface Aeronave {
  codigo: string;
  nome: string;
  modelo: string;
  tipo: string;
  capacidade: number;
  alcance: number;
  cliente: string;
  dataEntrega: string;
  imagem: string | File; 
}

const Aeronaves: React.FC = () => {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([
    {
      codigo: "1234",
      nome: "Aeronave MC 21 300",
      modelo: "MC21-300",
      tipo: "Militar",
      capacidade: 50,
      alcance: 3000,
      cliente: "Cliente A",
      dataEntrega: "11/11/2025",
      imagem: "aeronave1.jpg",
    },
    {
      codigo: "5678",
      nome: "Aeronave AIRBUS A320",
      modelo: "A320",
      tipo: "Comercial",
      capacidade: 180,
      alcance: 5000,
      cliente: "Cliente B",
      dataEntrega: "20/12/2025",
      imagem: "aeronave2.jpg",
    },
    {
      codigo: "9101",
      nome: "Aeronave BOMBARDIER CS300",
      modelo: "CS300",
      tipo: "Comercial",
      capacidade: 150,
      alcance: 4000,
      cliente: "Cliente C",
      dataEntrega: "05/01/2026",
      imagem: "aeronave3.jpg",
    },
  ]);

  const [pesquisa, setPesquisa] = useState("");
  const [selected, setSelected] = useState<Aeronave | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const aeronavesFiltradas = aeronaves.filter((aeronave) =>
    aeronave.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const handleCadastrar = (novaAeronave: Aeronave) => {
    setAeronaves([...aeronaves, novaAeronave]);
  };

  const navigate = useNavigate();

  const irParaEtapas = () => {
    navigate("/etapas");
  };


  return (
    <div className="aeronaves-container">
      <Sidebar />

      <main className="aeronaves-main">
        <h1>Gerenciamento de Aeronaves</h1>

        <div className="aeronaves-actions">
          <input
            type="text"
            placeholder="Pesquisar aeronave..."
            className="aeronaves-search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button
            className="btn cadastrar"
            onClick={() => setIsModalOpen(true)}
          >
            Cadastrar Aeronave
          </button>
          <button className="btn etapas" onClick={irParaEtapas}>Etapas de Produção</button>
        </div>

        <div className="aeronaves-list">
          {aeronavesFiltradas.length > 0 ? (
            aeronavesFiltradas.map((aeronave, index) => (
              <div
                key={index}
                className="aeronave-card"
                onClick={() => setSelected(aeronave)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    typeof aeronave.imagem === "string"
                      ? aeronave.imagem
                      : URL.createObjectURL(aeronave.imagem)
                  }
                  alt={aeronave.nome}
                  className="aeronave-img"
                />
                <p className="aeronave-nome">{aeronave.nome}</p>
              </div>
            ))
          ) : (
            <p className="sem-resultados">Nenhuma aeronave encontrada</p>
          )}
        </div>

        {selected && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setSelected(null)}>
                &times;
              </span>
              <h2>{selected.nome}</h2>
              <img
                src={
                  typeof selected.imagem === "string"
                    ? selected.imagem
                    : URL.createObjectURL(selected.imagem)
                }
                alt={selected.nome}
                className="modal-img"
              />
              <p><strong>Código:</strong> {selected.codigo}</p>
              <p><strong>Modelo:</strong> {selected.modelo}</p>
              <p><strong>Tipo:</strong> {selected.tipo}</p>
              <p><strong>Capacidade:</strong> {selected.capacidade}</p>
              <p><strong>Alcance:</strong> {selected.alcance}</p>
              <p><strong>Cliente:</strong> {selected.cliente}</p>
              <p><strong>Data de Entrega:</strong> {selected.dataEntrega}</p>
            </div>
          </div>
        )}

        <CadastrarAeronave
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCadastrar={handleCadastrar}
        />
      </main>
    </div>
  );
};

export default Aeronaves;