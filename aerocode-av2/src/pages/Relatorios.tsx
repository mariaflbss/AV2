import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import GerarRelatorio from "../components/GerarRelatorio"; 
import "../Relatorio.css";

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

const Relatorios: React.FC = () => {
  const [aeronaves] = useState<Aeronave[]>([
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
      pecas: [{ nome: "Motor X1", tipo: "nacional", fornecedor: "AeroParts", status: "em produção" }],
      etapas: [
        { nome: "Montagem Estrutural", prazo: "11/11/2025", status: "em andamento" },
        { nome: "Teste de Solo", prazo: "15/11/2025", status: "pendente" },
      ],
      testes: [
        { tipo: "Elétrico", resultado: "aprovado" },
        { tipo: "Hidráulico", resultado: "reprovado" },
      ],
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
      pecas: [{ nome: "Painel Digital", tipo: "importada", fornecedor: "SkyTech", status: "em transporte" }],
      etapas: [{ nome: "Montagem Estrutural", prazo: "01/12/2025", status: "em andamento" }],
      testes: [
        { tipo: "Aerodinâmico", resultado: "aprovado" },
        { tipo: "Pressurização", resultado: "aprovado" },
      ],
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
      pecas: [{ nome: "Asa Delta", tipo: "nacional", fornecedor: "AeroBras", status: "pronta" }],
      etapas: [{ nome: "Montagem Estrutural", prazo: "20/12/2025", status: "finalizada" }],
      testes: [{ tipo: "Elétrico", resultado: "aprovado" }],
    },
  ]);

  const [pesquisa, setPesquisa] = useState("");
  const [relatorios, setRelatorios] = useState<Relatorio[]>([
  { titulo: "Relatório 1", aeronave: aeronaves[0] },
  { titulo: "Relatório 2", aeronave: aeronaves[1] },
  { titulo: "Relatório 3", aeronave: aeronaves[2] },
]);

  const [aeronaveSelecionada, setAeronaveSelecionada] = useState<Aeronave | null>(null);
  const [mensagemSalvo, setMensagemSalvo] = useState("");

  const aeronavesFiltradas = aeronaves.filter(
    (a) =>
      a.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      a.modelo.toLowerCase().includes(pesquisa.toLowerCase()) ||
      a.codigo.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const adicionarRelatorio = (relatorio: Relatorio) => {
    setRelatorios([relatorio, ...relatorios]);
  };

  const gerarRelatorioTexto = (aeronave: Aeronave) => {
    const dataAtual = new Date().toLocaleDateString("pt-BR");
    return `
Relatório da Aeronave

Informações da Aeronave:
• Código: ${aeronave.codigo}
• Nome: ${aeronave.nome}
• Modelo: ${aeronave.modelo}
• Tipo: ${aeronave.tipo}
• Capacidade: ${aeronave.capacidade} passageiros
• Alcance: ${aeronave.alcance} km
• Cliente: ${aeronave.cliente}
• Data de Entrega: ${aeronave.dataEntrega}

Peças usadas:
${aeronave.pecas?.map((p,i) => `${i+1}. ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}`).join("\n") || "Nenhuma peça cadastrada."}

Etapas de produção:
${aeronave.etapas?.map((e,i) => `${i+1}. ${e.nome} | Prazo: ${e.prazo} | Status: ${e.status}`).join("\n") || "Nenhuma etapa registrada."}

Resultado dos testes:
${aeronave.testes?.map((t,i) => `${i+1}. ${t.tipo} | Resultado: ${t.resultado}`).join("\n") || "Nenhum teste registrado."}

Data de emissão: ${dataAtual}
`;
  };

  const salvarRelatorio = (relatorio: Relatorio) => {
    const texto = gerarRelatorioTexto(relatorio.aeronave);
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const nomeArquivo = `relatorio_${relatorio.titulo}_${relatorio.aeronave.nome}.txt`;
    link.download = nomeArquivo;
    link.click();
    setMensagemSalvo(`Relatório salvo como: ${nomeArquivo}`);
  };

  return (
    <div className="relatorios-container">
      <Sidebar />

      <main className="relatorios-main">
        <h1>Gerar Relatórios</h1>

        {!aeronaveSelecionada ? (
          <>
        <div className="relatorio-actions">
            <input type="text" 
             className="pesquisa-input" 
             placeholder="Pesquisar aeronave..."
             value={pesquisa}
             onChange={(e) => 
             setPesquisa(e.target.value)} />
            <GerarRelatorio
             aeronaves={aeronavesFiltradas}
             adicionarRelatorio={adicionarRelatorio}
             className="btn-gerar"/>
        </div>

        <div className="relatorio-list">
             {relatorios.length === 0 && <p>Nenhum relatório gerado ainda.</p>}
             {relatorios.map((r, i) => (
            <div
             key={i}
             className="relatorio-card"
             onClick={() => setAeronaveSelecionada(r.aeronave)}>
             <p className="relatorio-titulo">{r.titulo}</p>
             <span className="relatorio-aeronave">{r.aeronave.nome}</span>
            </div>
          ))}
        </div>

          </>
        ) : (
          <div className="relatorio-detalhe">
            <button className="btn voltar" onClick={() => setAeronaveSelecionada(null)}>
              ← Voltar
            </button>

            <h2>Relatório da aeronave {aeronaveSelecionada.nome}</h2>
            <div className="relatorio-box">
              <pre>{gerarRelatorioTexto(aeronaveSelecionada)}</pre>
            </div>

            <button
              className="btn salvar"
              onClick={() => {
                const relatorioTemp: Relatorio = { titulo: `Relatório ${aeronaveSelecionada.codigo}`, aeronave: aeronaveSelecionada };
                salvarRelatorio(relatorioTemp);
              }}
            >
              Salvar Relatório (.txt)
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Relatorios;
