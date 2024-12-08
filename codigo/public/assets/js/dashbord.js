// URL do JSON Server
const API_URL = "http://localhost:3001/lancamentos"; // Substitua pelo seu endpoint

// Função para atualizar o dashboard
function atualizarDashboard(dados) {
  let saldoAtual = 0;
  let receitas = 0;
  let despesas = 0;
  const progressoSaldo = [];

  dados.forEach((item) => {
    const valor = parseFloat(item.valor);
    if (item.tipo === "receita") {
      receitas += valor;
      saldoAtual += valor;
    } else if (item.tipo === "despesa") {
      despesas += Math.abs(valor);
      saldoAtual -= valor;
    }
    progressoSaldo.push(saldoAtual);
  });

  // Atualizar valores nos cards
  document.getElementById("receitas").textContent = `R$ ${receitas.toLocaleString()}`;
  document.getElementById("despesas").textContent = `R$ ${despesas.toLocaleString()}`;
  document.getElementById("saldo").textContent = `R$ ${saldoAtual.toLocaleString()}`;

  // Criar gráficos
  criarGraficoSaldo(progressoSaldo);
  criarGraficoComparacao(receitas, despesas);
  calcularProgressoObjetivos();
}


// Função para buscar dados do JSON Server
async function buscarDados() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados");
    }
    const dados = await response.json();
    atualizarDashboard(dados);
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Função para criar o gráfico de progresso do saldo
// Função para criar o gráfico de progresso do saldo
function criarGraficoSaldo(progressoSaldo) {
  if (!Array.isArray(progressoSaldo)) {
    console.error("progressoSaldo não é um array válido:", progressoSaldo);
    return;
  }

  const ctx = document.getElementById("graficoSaldo").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: progressoSaldo.map((_, index) => `Dia ${index + 1}`),
      datasets: [
        {
          label: "Progresso do Saldo",
          data: progressoSaldo,
          borderColor: "blue",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Progresso do Saldo",
        },
      },
    },
  });
}


// Função para criar o gráfico de comparação entre receitas e despesas
function criarGraficoComparacao(receitas, despesas) {
  const ctx = document.getElementById("graficoComparacao").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Receitas", "Despesas"],
      datasets: [
        {
          data: [receitas, despesas],
          backgroundColor: ["#28a745", "#dc3545"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
        },
      },
    },
  });
}

// Função para criar gráficos de progresso de objetivos dinamicamente
function criarGraficosObjetivos(objetivos) {
  const container = document.getElementById("objetivosContainer");
  container.innerHTML = ""; // Limpar conteúdo anterior

  objetivos.forEach((objetivo, index) => {
    const { nome, valor_total, valor_atual } = objetivo;

    // Cálculo do progresso em percentual
    const percentual = valor_total > 0 ? (valor_atual / valor_total) * 100 : 0;

    // Criar elemento do gráfico e texto
    const objetivoCard = document.createElement("div");
    objetivoCard.classList.add("col-md-3", "text-center", "mb-4"); // Classes Bootstrap para layout

    objetivoCard.innerHTML = `
      <div>
        <canvas id="objetivoGrafico${index}" width="100" height="100"></canvas>
        <p class="mt-2"><strong>${nome}</strong></p>
        <p>${percentual.toFixed(2)}% concluído</p>
      </div>
    `;
    container.appendChild(objetivoCard);

    // Criar o gráfico circular
    const ctx = document.getElementById(`objetivoGrafico${index}`).getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Concluído", "Restante"],
        datasets: [
          {
            data: [percentual, 100 - percentual],
            backgroundColor: ["#4CAF50", "#E0E0E0"], // Cores do progresso
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw.toFixed(2)}%`;
              },
            },
          },
          title: {
            display: true,
            text: `${nome}`, // Nome do objetivo no título
          },
        },
      },
    });
  });
}

// Função para buscar e criar gráficos de objetivos
async function buscarObjetivos() {
  try {
    const response = await fetch("http://localhost:3001/objetivos");
    if (!response.ok) throw new Error("Erro ao buscar objetivos");

    const objetivos = await response.json();
    criarGraficosObjetivos(objetivos); // Gerar gráficos para cada objetivo
  } catch (error) {
    console.error("Erro ao buscar objetivos:", error);
  }
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  buscarObjetivos();
});



// Atualizar o Dashboard com todos os gráficos
function atualizarDashboard(dados) {
  const receitas = dados.filter((d) => d.tipo === "receita").reduce((acc, item) => acc + item.valor, 0);
  const despesas = dados.filter((d) => d.tipo === "despesa").reduce((acc, item) => acc + item.valor, 0);
  const saldo = receitas - despesas;

  // Atualizar valores dos cards
  document.getElementById("receitas").textContent = `R$ ${receitas.toLocaleString()}`;
  document.getElementById("despesas").textContent = `R$ ${despesas.toLocaleString()}`;
  document.getElementById("saldo").textContent = `R$ ${saldo.toLocaleString()}`;

  // Criar gráficos
  criarGraficoSaldo(saldo, receitas, despesas);
  criarGraficoComparacao(receitas, despesas);
}


document.addEventListener("DOMContentLoaded", () => {
  buscarDados();
});

//////// Grafico Categorias de Gasto 


window.onload = () => {
  const canvas = document.getElementById('categoriaDonutChart');
  // Definindo explicitamente o tamanho do canvas no JS
  canvas.width = 300;  // Largura do canvas
  canvas.height = 300; // Altura do canvas
  fetchCategorias();
};

function fetchCategorias() {
  const endpoint = "http://localhost:3001/lancamentos"; 
  fetch(endpoint)
      .then(response => response.json())
      .then(dataList => {
          const categoriaMap = {};
          let valorTotal = 0;

          dataList.forEach(lancamento => {
              const valor = parseFloat(lancamento.valor); 

              if (!isNaN(valor)) { 
                  if (!categoriaMap[lancamento.categoria]) {
                      categoriaMap[lancamento.categoria] = 0;
                  }
                  categoriaMap[lancamento.categoria] += valor;
                  valorTotal += valor;
              } else {
                  console.warn(`Valor inválido para lançamento: ${lancamento.valor}`);
              }
          });

          exibirTotal(valorTotal);

          createDonutChart(categoriaMap);
      })
      .catch(error => console.error("Erro ao carregar dados de categorias:", error));
}

function exibirTotal(valorTotal) {
  const totalElement = document.getElementById('categoriaDonutChart');
  totalElement.textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
}

function createDonutChart(categoriaMap) {
  const labels = Object.keys(categoriaMap);
  const data = Object.values(categoriaMap);

  const ctx = document.getElementById('categoriaDonutChart').getContext('2d');
  
  new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: labels,
          datasets: [{
              label: 'Valores por Categoria',
              data: data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF'],
              hoverOffset: 4
          }]
      },
      options: {
          responsive: false,  // Desativa o redimensionamento automático
          maintainAspectRatio: false,  // Desativa a manutenção da proporção
          cutout: '55%',  // Tamanho do buraco central no donut
          plugins: {
              legend: {
                  position: 'top',  // Posição da legenda
                  labels: {
                      font: {
                          size: 14,
                          family: ' "Titillium Web", sans-serif',
                          weight: '60',
                      },
                      color: '#333',
                  },
              },
              tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Cor de fundo do tooltip
                  titleFont: {
                      size: 16,
                      weight: 'bold',
                      family: ' "Titillium Web", sans-serif'
                  },
                  bodyFont: {
                      size: 14,
                      weight: 'normal',
                  },
                  callbacks: {
                      label: function(tooltipItem) {
                          return `${tooltipItem.label}: R$ ${tooltipItem.raw.toFixed(2)}`;
                      }
                  }
              },
              datalabels: {
                  display: true,
                  color: '#fff',
                  font: {
                      weight: 'bold',
                      size: 16
                  },
                  formatter: (value) => `R$ ${value.toFixed(2)}`,
              }
          },
          animation: {
              animateScale: true,
              animateRotate: true, // Animação de rotação ao carregar
          }
      }
  });
}