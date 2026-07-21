interface Window {
  api: {
    executarExercicio: (numero: number) => Promise<{ titulo: string; descricao: string; output: string }>;
  };
  carregarExercico: (numero: number) => Promise<void>;
}

async function selecionarExercicio(numero: number): Promise<void> {
  try {
    const resultado = await window.api.executarExercicio(numero);

    const tituloEl = document.getElementById("ex-titulo");
    const descEl = document.getElementById("ex-descricao");
    const outputEl = document.getElementById("output");

    if (tituloEl) tituloEl.innerText = resultado.titulo;
    if (descEl) descEl.innerText = resultado.descricao;
    if (outputEl) outputEl.innerText = `> ${resultado.output}`;
  } catch (error) {
    console.error("Erro ao executar exercício:", error);
  }
}

// Anexa explicitamente ao objeto window da janela
window.carregarExercico = selecionarExercicio;