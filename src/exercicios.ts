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
  executar: () => string | Promise<string>;
}

// Exercício 3: apenas os campos que o formulário de cadastro envia (o id quem gera é o banco)
export interface ProdutoCadastro {
  nome: string;
  preco: number;
  quantidade: number;
  idCategoria: number;
}

export interface ErrosProduto {
  nome?: string;
  preco?: string;
  quantidade?: string;
}

export interface ResultadoValidacao {
  valido: boolean;
  erros: ErrosProduto;
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


export function validarCadastroProduto(dados: ProdutoCadastro): ResultadoValidacao {
  const erros: ErrosProduto = {};

  if (!dados.nome || dados.nome.trim().length < 3) {
    erros.nome = "O nome é obrigatório e deve ter no mínimo 3 caracteres.";
  }

  if (dados.preco <= 0) {
    erros.preco = "O preço deve ser maior que zero.";
  }

  if (dados.quantidade < 0) {
    erros.quantidade = "A quantidade não pode ser negativa.";
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros
  };
}

export function consultarProdutoBanco(id: number, lista: Produto[]): Promise<Produto> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produto = lista.find((p) => p.id === id);

      if (produto) {
        resolve(produto);
      } else {
        reject(`Produto com ID ${id} não encontrado no banco de dados.`);
      }
    }, 1000);
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
    titulo: "Exercício 3: Validação do Formulário de Cadastro",
    descricao: "Valida os dados de um produto antes de enviá-los via IPC para o INSERT no banco.",
    executar: () => {
      const produtoValido: ProdutoCadastro = {
        nome: "Headset Gamer",
        preco: 199.9,
        quantidade: 12,
        idCategoria: 1
      };

      const produtoInvalido: ProdutoCadastro = {
        nome: "Mo",
        preco: 0,
        quantidade: -5,
        idCategoria: 1
      };

      const resultadoValido = validarCadastroProduto(produtoValido);
      const resultadoInvalido = validarCadastroProduto(produtoInvalido);

      console.log("Resultado produto válido:", resultadoValido);
      console.log("Resultado produto inválido:", resultadoInvalido);

      return [
        `Produto válido -> valido: ${resultadoValido.valido}, erros: ${JSON.stringify(resultadoValido.erros)}`,
        `Produto inválido -> valido: ${resultadoInvalido.valido}, erros: ${JSON.stringify(resultadoInvalido.erros)}`
      ].join('\n');
    }
  },
  4: {
    titulo: "Exercício 4: Simulação de Banco de Dados Assíncrono (Promises)",
    descricao: "Consulta um produto simulando latência de banco de dados (1s) usando Promises e async/await.",
    executar: async () => {
      const linhas: string[] = [];

      try {
        const produtoEncontrado = await consultarProdutoBanco(1, produtosMock);
        linhas.push(`Sucesso -> Produto encontrado: ${JSON.stringify(produtoEncontrado)}`);
        console.log("Consulta bem-sucedida:", produtoEncontrado);
      } catch (erro) {
        linhas.push(`Falha inesperada: ${erro}`);
        console.error(erro);
      }

      try {
        const produtoInexistente = await consultarProdutoBanco(999, produtosMock);
        linhas.push(`Sucesso inesperado: ${JSON.stringify(produtoInexistente)}`);
      } catch (erro) {
        linhas.push(`Falha -> ${erro}`);
        console.error("Erro na consulta:", erro);
      }

      return linhas.join('\n');
    }
  }
};