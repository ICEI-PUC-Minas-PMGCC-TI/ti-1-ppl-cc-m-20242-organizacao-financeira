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
      const progressBar = document.querySelector(".progress");
      
      if (progressBar) { // Verifica se o elemento existe
        progressBar.style.width = `${progresso}%`;
        progressBar.setAttribute("aria-valuenow", progresso);
      }

      // Exibe os depósitos
      exibirDepositos(objetivo.depositos);
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

  // Adiciona o depósito no servidor
  fetch(`${baseUrl}/${objetivoId}`)
    .then((response) => response.json())
    .then((objetivo) => {
      const novoValorInicial = objetivo.valorInicial + valorDeposito;
      const novoDeposito = {
        id: Date.now(), // ID único baseado no timestamp
        valor: valorDeposito,
        data: dataDeposito
      };

      fetch(`${baseUrl}/${objetivoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...objetivo,
          valorInicial: novoValorInicial,
          depositos: [...objetivo.depositos, novoDeposito]
        })
      })
        .then(() => {
          alert("Depósito adicionado com sucesso!");
          const modalDeposito = bootstrap.Modal.getInstance(document.getElementById("modalDeposito"));
          modalDeposito.hide(); // Fecha o modal
          carregarDetalhes(); // Atualiza a página
        })
        .catch((error) => console.error("Erro ao adicionar depósito:", error));
    });
}


function exibirDepositos(depositos) {
  const listaDepositos = document.getElementById("lista-depositos");
  listaDepositos.innerHTML = ""; // Limpa os depósitos existentes

  depositos.forEach((deposito) => {
    const depositoItem = document.createElement("div");
    depositoItem.className = "d-flex justify-content-between align-items-center mb-2";
    depositoItem.innerHTML = `
      <span>${new Date(deposito.data).toLocaleDateString("pt-BR")}</span>
      <div class="d-flex align-items-center">
        <span class="text-success me-3">R$ ${deposito.valor.toFixed(2)}</span>
        <button class="btn btn-sm btn-outline-danger" onclick="removerDeposito(${deposito.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    listaDepositos.appendChild(depositoItem);
  });
}

function removerDeposito(depositoId) {
  fetch(`${baseUrl}/${objetivoId}`)
    .then((response) => response.json())
    .then((objetivo) => {
      const depositoRemovido = objetivo.depositos.find(d => d.id === depositoId);
      const novoValorInicial = objetivo.valorInicial - depositoRemovido.valor;
      const novosDepositos = objetivo.depositos.filter(d => d.id !== depositoId);

      fetch(`${baseUrl}/${objetivoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...objetivo,
          valorInicial: novoValorInicial,
          depositos: novosDepositos
        })
      })
        .then(() => {
          alert("Depósito removido com sucesso!");
          carregarDetalhes(); // Atualiza a página
        })
        .catch((error) => console.error("Erro ao remover depósito:", error));
    });
}



// Carrega os detalhes ao iniciar a página
window.onload = carregarDetalhes;
