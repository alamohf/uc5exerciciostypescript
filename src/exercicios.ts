export interface Categoria {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  idCategoria: number;
}

export interface ExercicoItem {
  titulo: string;
  descricao: string;
  executar: () => string;
}

// MOCK DE CATEGORIAS (Necessário para poder buscar por nome da categoria)
export const categoriasMock: Categoria[] = [
  { id: 1, nome: "Periféricos" },
  { id: 2, nome: "Monitores" }
];

export const produtosMock: Produto[] = [
  { id: 1, nome: "Teclado Mecânico", preco: 250, quantidade: 10, idCategoria: 1 },
  { id: 2, nome: "Mouse Gamer", preco: 150, quantidade: 5, idCategoria: 1 },
  { id: 3, nome: "Monitor 24'", preco: 800, quantidade: 2, idCategoria: 2 }
];

export function calcularValorTotalEstoque(lista: Produto[]): number {
  return lista.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

export function buscarProdutosPorTexto(
  lista: Produto[],
  termoBusca: string,
  categorias: Categoria[] = categoriasMock // Suporte ao desafio da Categoria
): Produto[] {
  // Trata o texto tirando espaços das pontas e normalizando para minúsculo
  const termoLimpo = termoBusca.trim().toLowerCase();

  // Requisito 3: Se a busca estiver vazia, retorna a lista completa
  if (!termoLimpo) {
    return lista;
  }

  // Requisito 2 e 4: Filtra por Nome ou por Categoria
  return lista.filter((produto) => {
    // Busca pelo nome do produto (ignora maiúsculas/minúsculas)
    const nomeCorresponde = produto.nome.toLowerCase().includes(termoLimpo);

    // Desafio: Localiza a categoria vinculada ao produto e verifica se o nome bate
    const categoriaDoProduto = categorias.find((cat) => cat.id === produto.idCategoria);
    const categoriaCorresponde = categoriaDoProduto
      ? categoriaDoProduto.nome.toLowerCase().includes(termoLimpo)
      : false;

    return nomeCorresponde || categoriaCorresponde;
  });
}


export const mapaExercicios: Record<number, ExercicoItem> = {
  1: {
    titulo: "Exercício 1: Modelagem Relacional e Estoque",
    descricao: "Calcula o valor total acumulado no estoque multiplicando preço por quantidade.",
    executar: () => {
      const total = calcularValorTotalEstoque(produtosMock);
      return `Produtos em estoque: ${produtosMock.length}\nValor total acumulado: R$ ${total.toFixed(2)}`;
    }
  },
  2: {
    titulo: "Exercício 2: Filtro de Busca Tipado",
    descricao: "Filtra a lista de produtos por nome ou categoria em tempo real.",
    executar: () => {
      const buscaNome = buscarProdutosPorTexto(produtosMock, "mouse");

      const buscaCategoria = buscarProdutosPorTexto(produtosMock, "monitores");
      
    

      return [
      ` Busca por 'mouse': ${buscaNome.map(p => p.nome).join(', ')}`,
      ` Busca por 'monitores': ${buscaCategoria.map(p => p.nome).join(', ')}`
    ].join('\n');
    }
  },
  3: {
    titulo: "Exercício 3",
    descricao: "Aguardando enunciado...",
    executar: () => "Exercício não implementado ainda."
  },
  4: {
    titulo: "Exercício 4",
    descricao: "Aguardando enunciado...",
    executar: () => "Exercício não implementado ainda."
  }
};