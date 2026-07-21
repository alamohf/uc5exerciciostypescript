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

export function calcularValorTotalEstoque(lista: Produto[]): number {
  return lista.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

export const produtosMock: Produto[] = [
  { id: 1, nome: "Teclado Mecânico", preco: 250, quantidade: 10, idCategoria: 1 },
  { id: 2, nome: "Mouse Gamer", preco: 150, quantidade: 5, idCategoria: 1 },
  { id: 3, nome: "Monitor 24'", preco: 800, quantidade: 2, idCategoria: 2 }
];

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
    titulo: "Exercício 2",
    descricao: "Aguardando enunciado...",
    executar: () => "Exercício não implementado ainda."
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