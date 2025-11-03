export type NivelUsuario = 'admin' | 'engenheiro' | 'operador';

export const podeAcessar = (nivel: NivelUsuario, pagina: string): boolean => {
  const permissoes: Record<NivelUsuario, string[]> = {
    admin: [
      'Dashboard',
      'Gerenciar Aeronaves',
      'Gerenciar Funcionários',
      'Gerenciar Peças',
      'Gerenciar Testes',
      'Relatórios',
    ],
    engenheiro: [
      'Dashboard',
      'Gerenciar Aeronaves',
      'Gerenciar Peças',
      'Gerenciar Testes',
      'Relatórios',
    ],
    operador: [
      'Dashboard',
      'Gerenciar Aeronaves',
      'Gerenciar Peças',
    ],
  };

  return permissoes[nivel]?.includes(pagina) ?? false;
};

export const podeFazer = (
  nivel: NivelUsuario,
  acao: 'cadastrar' | 'editar' | 'deletar'
): boolean => {
  const acoesPorNivel: Record<NivelUsuario, ('cadastrar' | 'editar' | 'deletar')[]> = {
    admin: ['cadastrar', 'editar', 'deletar'],
    engenheiro: ['cadastrar', 'editar'],
    operador: [],
  };

  return acoesPorNivel[nivel]?.includes(acao) ?? false;
};
