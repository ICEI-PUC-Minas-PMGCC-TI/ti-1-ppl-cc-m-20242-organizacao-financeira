const baseUrl = "http://localhost:3001/objetivos"; // URL do JSON Server

// Obtém o ID do objetivo pela URL
const urlParams = new URLSearchParams(window.location.search);
const objetivoId = urlParams.get("id");

// Carrega os detalhes do objetivo
function carregarDetalhes() {
  fetch(`${baseUrl}/${objetivoId}`)
    .then((response) => response.json())
    .then((objetivo) => {
      document.getElementById("titulo-objetivo").textContent = `Detalhes: ${objetivo.nome}`;
      document.getElementById("nome-objetivo").textContent = objetivo.nome;
      document.getElementById("data-objetivo").textContent = `Data final: ${new Date(objetivo.data).toLocaleDateString("pt-BR")}`;
      document.getElementById("valor-total").textContent = `R$ ${objetivo.valor.toFixed(2)}`;
      document.getElementById("valor-atual").textContent = `R$ ${objetivo.valorInicial.toFixed(2)}`;

      // Atualiza o gráfico de progresso
      const progresso = (objetivo.valorInicial / objetivo.valor) * 100;
      document.getElementById("progresso").textContent = `${progresso.toFixed(2)}%`;
      document.getElementById("icone-objetivo").innerHTML = `
        <div class="rounded-circle" style="width: 50px; height: 50px; background-color: ${objetivo.cor}; display: flex; align-items: center; justify-content: center;">
          <i class="${objetivo.icone}" style="color: white; font-size: 20px;"></i>
        </div>`;
      document.querySelector(".progress-bar").style.width = `${progresso}%`;
      document.querySelector(".progress-bar").setAttribute("aria-valuenow", progresso);
    })
    .catch((error) => console.error("Erro ao carregar detalhes:", error));
}

// Abre o modal para adicionar depósito
function abrirModalDeposito() {
  const modalDeposito = new bootstrap.Modal(document.getElementById("modalDeposito"));
  modalDeposito.show();
}

// Função para salvar o depósito
function adicionarDeposito() {
  const valorDeposito = parseFloat(document.getElementById("valor-deposito").value);
  const dataDeposito = document.getElementById("data-deposito").value;

  if (isNaN(valorDeposito) || valorDeposito <= 0) {
    alert("Por favor, insira um valor válido!");
    return;
  }

  if (!dataDeposito) {
    alert("Por favor, insira uma data!");
    return;
  }

  // Atualiza o valor do objetivo no servidor
  fetch(`${baseUrl}/${objetivoId}`)
    .then((response) => response.json())
    .then((objetivo) => {
      const novoValorInicial = objetivo.valorInicial + valorDeposito;

      fetch(`${baseUrl}/${objetivoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...objetivo, valorInicial: novoValorInicial }),
      })
        .then(() => {
          alert("Depósito adicionado com sucesso!");
          const modalDeposito = bootstrap.Modal.getInstance(document.getElementById("modalDeposito"));
          modalDeposito.hide(); // Fecha o modal
          carregarDetalhes(); // Atualiza os detalhes
        })
        .catch((error) => console.error("Erro ao adicionar depósito:", error));
    });
}

// Carrega os detalhes ao iniciar a página
window.onload = carregarDetalhes;
