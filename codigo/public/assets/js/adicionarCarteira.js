const apiUrl = 'http://localhost:3001/carteiras';

async function addData() {

  const nomeConta = document.getElementById('nomeConta').value;
  const saldo = document.getElementById('saldo').value;
  const descricaoConta = document.getElementById('descricaoConta').value;
  const meta = document.getElementById('meta').value;
  const tipo = document.getElementById('tipo').value;
  const detalhes = document.getElementById('detalhes').value;


  const iconeSelecionado = document.querySelector('input[name="id_icone"]:checked');
  const id_icone = iconeSelecionado ? iconeSelecionado.value : null;


  const corSelecionada = document.querySelector('input[name="id_cor"]:checked');
  const id_cor = corSelecionada ? corSelecionada.value : null;


  if (!nomeConta || !saldo || !descricaoConta || !meta || !tipo || !id_icone || !id_cor) {
    alert('Por favor, preencha todos os campos!');
    return;
  }


  const novaConta = {
    nomeConta,
    saldo: parseFloat(saldo),
    descricaoConta,
    meta: parseFloat(meta),
    tipo,
    detalhes,
    id_icone,
    id_cor
  };


  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novaConta)
    });

    if (!response.ok) throw new Error('Erro ao registrar a conta.');

    alert('Conta registrada com sucesso!');
  
    limparFormulario();
    resetPreview();
  } catch (error) {
    console.error('Erro:', error);
  }
}

function limparFormulario() {
  document.getElementById('nomeConta').value = '';
  document.getElementById('saldo').value = '';
  document.getElementById('descricaoConta').value = '';
  document.getElementById('meta').value = '';
  document.getElementById('tipo').value = '';
  document.getElementById('detalhes').value = '';


  document.querySelectorAll('input[name="id_icone"]').forEach(input => input.checked = false);
  document.querySelectorAll('input[name="id_cor"]').forEach(input => input.checked = false);
}

function updatePreview() {
  const iconPreview = document.getElementById("icon-preview");
  const selectedIcon = document.querySelector('.icon-picker input:checked');
  const selectedColor = document.querySelector('.color-picker input:checked');

  if (selectedIcon) {
    iconPreview.textContent = selectedIcon.value;
  } else {
    iconPreview.textContent = "";
  }

  if (selectedColor) {
    const colorValue = selectedColor.value;
    document.querySelector('.preview-box').style.backgroundColor = colorValue;
  } else {
    document.querySelector('.preview-box').style.backgroundColor = "#fff";
  }
}

function resetPreview() {
  const iconPreview = document.getElementById("icon-preview");
  iconPreview.textContent = "";
  document.querySelector('.preview-box').style.backgroundColor = "#fff";
}

document.addEventListener('DOMContentLoaded', () => {
  const iconInputs = document.querySelectorAll('.icon-picker input');
  const colorInputs = document.querySelectorAll('.color-picker input');

  iconInputs.forEach(input => {
    input.addEventListener('change', updatePreview);
  });

  colorInputs.forEach(input => {
    input.addEventListener('change', updatePreview);
  });


  updatePreview();
});
