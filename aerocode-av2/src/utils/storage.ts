export function salvarDados<T>(chave: string, dados: T) {
  try {
    localStorage.setItem(chave, JSON.stringify(dados));
  } catch (erro) {
    console.error("Erro ao salvar no localStorage:", erro);
  }
}
 
export function carregarDados<T>(chave: string): T | null {
  try {
    const dados = localStorage.getItem(chave);
    return dados ? (JSON.parse(dados) as T) : null;
  } catch (erro) {
    console.error("Erro ao carregar do localStorage:", erro);
    return null;
  }
}