const apiUrl = 'http://localhost:3000/contas';
let originalData = [];
let chart;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Erro ao carregar as carteiras.');
    originalData = await response.json();

    populateFilters();
    renderChart(originalData);

    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    setupDropdowns();
  } catch (error) {
    console.error('Erro:', error);
  }
});

function setupDropdowns() {
  const toggleName = document.getElementById('toggle-name');
  const toggleType = document.getElementById('toggle-type');
  const filterName = document.getElementById('filter-name');
  const filterType = document.getElementById('filter-type');

  toggleName.addEventListener('click', () => {
    filterName.style.display = filterName.style.display === 'block' ? 'none' : 'block';
    filterType.style.display = 'none';
  });

  toggleType.addEventListener('click', () => {
    filterType.style.display = filterType.style.display === 'block' ? 'none' : 'block';
    filterName.style.display = 'none';
  });

  document.addEventListener('click', (event) => {
    if (!toggleName.contains(event.target) && !filterName.contains(event.target)) {
      filterName.style.display = 'none';
    }
    if (!toggleType.contains(event.target) && !filterType.contains(event.target)) {
      filterType.style.display = 'none';
    }
  });
}

function populateFilters() {
  const nameContainer = document.getElementById('filter-name');
  const typeContainer = document.getElementById('filter-type');

  const uniqueNames = [...new Set(originalData.map(item => item.nomeConta))];
  const uniqueTypes = [...new Set(originalData.map(item => item.tipo))];

  uniqueNames.forEach(name => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="checkbox" value="${name}">
      ${name}
    `;
    nameContainer.appendChild(label);
  });

  uniqueTypes.forEach(type => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="checkbox" value="${type}">
      ${type}
    `;
    typeContainer.appendChild(label);
  });
}

function applyFilters() {
  const selectedNames = Array.from(document.querySelectorAll('#filter-name input:checked')).map(input => input.value);
  const selectedTypes = Array.from(document.querySelectorAll('#filter-type input:checked')).map(input => input.value);

  const filteredData = originalData.filter(item => {
    const matchesName = !selectedNames.length || selectedNames.includes(item.nomeConta);
    const matchesType = !selectedTypes.length || selectedTypes.includes(item.tipo);
    return matchesName && matchesType;
  });

  renderChart(filteredData);
}

function renderChart(data) {
  const ctx = document.getElementById('donutChart').getContext('2d');

  const labels = data.map(item => item.nomeConta);
  const values = data.map(item => item.saldo);
  const backgroundColors = data.map(item => item.id_cor);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: backgroundColors
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const value = tooltipItem.raw;
              return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            }
          }
        },
        title: {
          display: true,
          text: `Total: R$ ${values.reduce((a, b) => a + b, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        }
      }
    }
  });
}
